"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Bookmark } from "../types";
import axios from "axios";

const item = { title: "", url: "", icon: "" };

interface Props {
  setBookmarks: Dispatch<SetStateAction<any>>;
  onOpenChange: () => void;
  isOpen: boolean;
  bookmark: Bookmark;
}

const Editor = ({ setBookmarks, bookmark, onOpenChange, isOpen }: Props) => {
  const [state, setState] = useState<Bookmark>(item);
  const [loading, setLoading] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    setState(bookmark);
  }, [bookmark]);

  const update = () => {
    setLoading(true);
    axios
      .post("/api/getLogo", { url: state.url })
      .then(({ data }) => {
        setValid(false);
        axios
          .put(`/api/bookmarks/${state.id}`, { ...state, icon: data })
          .then(() => {
            onOpenChange();
            setLoading(false);
            setBookmarks((p: Bookmark[]) => {
              p.map((e, i) =>
                e.id === state.id ? p.splice(i, 1, state) : item
              );
              return p;
            });
            setState(item);
          });
      })
      .catch(() => {
        setValid(true);
        setLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update this bookmark
            </ModalHeader>
            <ModalBody>
              <Input
                label="Title"
                value={state.title}
                labelPlacement="outside"
                onChange={(e) =>
                  setState((p) => ({ ...p, title: e.target.value }))
                }
              />
              <Input
                label="Website Url"
                value={state.url}
                labelPlacement="outside"
                isInvalid={valid}
                onChange={(e) =>
                  setState((p) => ({ ...p, url: e.target.value }))
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="success"
                onPress={update}
                isLoading={loading}
                isDisabled={state.title === "" || state.url === ""}
              >
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default Editor;
