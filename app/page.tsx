"use client";
import React, { useEffect, useState } from "react";
import Creator from "./_components/Creator";
import axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  NextUIProvider,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import { TbBookmarksFilled } from "react-icons/tb";
import { Bookmark } from "./types";
import { motion } from "framer-motion";
import "./page.scss";
import Editor from "./_components/Editor";

const item = { title: "", url: "", icon: "" };

const Home = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [bookmark, setBookmark] = useState<Bookmark>(item);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/bookmarks")
      .then(({ data }) => {
        setBookmarks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const deleteBookmark = (id: string | undefined) => {
    axios.delete(`/api/bookmarks/${id}`).then(({ data }) => {
      const filtered = bookmarks.filter((e) => e.id !== data);
      setBookmarks(filtered);
    });
  };

  const setUpEditor = (item: Bookmark) => {
    setBookmark(item);
    onOpenChange();
  };

  return (
    <NextUIProvider className="mainBlock">
      <header className="flex p-4 items-center justify-between">
        <div className="flex gap-2">
          <TbBookmarksFilled className="text-2xl" />
          <text>Bookmarks</text>
        </div>
        <Input
          placeholder="Search"
          startContent={<IoSearch />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[250px]"
        />
        <Creator setBookmarks={setBookmarks} />
      </header>
      <motion.div layout className="bookmarks">
        {loading ? (
          <Spinner color="warning" size="lg" />
        ) : (
          bookmarks
            .filter((e) =>
              e.title?.toLowerCase().includes(search.toLowerCase())
            )
            .map((item: Bookmark, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={index}
                layout
              >
                <Card
                  isPressable
                  className="card"
                  onPress={() =>
                    open(
                      item.url.includes("https://")
                        ? item.url
                        : "https://" + item.url,
                      "_blank"
                    )
                  }
                >
                  <CardBody className="overflow-visible p-0 flex">
                    <div className="flex items-center gap-2 justify-center my-4">
                      <Avatar size="md" src={item.icon} className="p-2" />
                      <Tooltip content={item.title} color="warning">
                        <text>{item.title}</text>
                      </Tooltip>
                    </div>
                  </CardBody>
                  <CardFooter className="text-small justify-between">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          className="w-full"
                          color="warning"
                          variant="flat"
                        >
                          Actions
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                          key="edit"
                          onClick={() => setUpEditor(item)}
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          onClick={() => deleteBookmark(item.id)}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </CardFooter>
                </Card>
              </motion.div>
            ))
        )}
      </motion.div>
      <Editor
        setBookmarks={setBookmarks}
        bookmark={bookmark}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </NextUIProvider>
  );
};

export default Home;
