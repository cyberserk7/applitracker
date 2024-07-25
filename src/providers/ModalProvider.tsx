"use client";

import { AddApplicationModal } from "@/components/modals/add-application-modal";
import { ApplicationDetailsModal } from "@/components/modals/application-details-modal";
import { SetInterviewDateModal } from "@/components/modals/set-interview-date-modal";
import TrashCommandModal from "@/components/modals/trash-command-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AddApplicationModal />
      <ApplicationDetailsModal />
      <TrashCommandModal />
      <SetInterviewDateModal />
    </>
  );
};
