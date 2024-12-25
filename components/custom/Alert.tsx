"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export default function Alert({
  openAlert,
  setOpenAlert,
  onConfirm,
  isLoading
}: {
  openAlert: boolean;
  setOpenAlert: (v: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean
}) {
  return (
    <AlertDialog open={openAlert}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-h5">Are you absolutely sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can not be undone!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="">
          <AlertDialogCancel onClick={() => setOpenAlert(false)}>
            No, cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={() => onConfirm()}>
            Yes, Go ahead
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
