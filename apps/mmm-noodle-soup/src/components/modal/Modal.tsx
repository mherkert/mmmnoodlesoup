import { useState } from "react";
import React from "react";
import {
  //   Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";
import { Button } from "../buttons/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Modal = () => {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }


  return (
    <>
      <Button onClick={open} variant="outline" inverse={true} size="md">
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Recipe
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => {/** do nothing */}}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full rounded-md bg-white p-6  duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h3" className=" text-primary">
                Add your Recipe
              </DialogTitle>
              <p>Content</p>
              <div className="mt-4 flex gap-2">
                <Button variant="primary" onClick={close}>
                  Save
                </Button>
                <Button variant="outline" onClick={close}>
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
