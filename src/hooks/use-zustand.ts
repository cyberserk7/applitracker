import { JobApplication } from "@/models/User";
import axios from "axios";
import { create } from "zustand";
export type ModalType = "new-application" | "trash" | "feedback" | "settings" | "search" | "support" | "edit-application" | "application-details"

interface ModalData {
    application?: JobApplication;
    applicationStatus?: string;
    applications?: JobApplication[];
}

interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
    onClose: () => set({ type: null, isOpen: false })
}));


interface ApplicationStoreProps {
    applications: JobApplication[];
    archivedApplications: JobApplication[];
    loading: boolean;
    fetchApplications: () => Promise<void>;
    setApplications: (applications: JobApplication[]) => void;
    setArchivedApplications: (applications: JobApplication[]) => void;
    refreshApplications: () => Promise<void>;
    trashCount: number;
    setTrashCount: (count: number) => void;
}

export const useApplicationStore = create<ApplicationStoreProps>((set) => ({
    applications: [],
    archivedApplications: [],
    trashCount: 0,
    loading: false,
    fetchApplications: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(`/api/get-applications`);
            if(response.data.success) {
                set({ applications: response.data.applications.filter((app: JobApplication) => !app.isArchived) });
                set({ archivedApplications: response.data.applications.filter((app: JobApplication) => app.isArchived) });
                set({ trashCount: response.data.applications.filter((app: JobApplication) => app.isArchived).length})
            }
        } catch (error) {
            console.error('Failed to fetch applications', error);
        } finally {
            set({ loading: false });
        }
    },
    setApplications: (applications: JobApplication[]) => {
        set({ applications: applications }); 
    },
    setArchivedApplications: (applications: JobApplication[]) => {
        set({ archivedApplications: applications }); 
    },
    refreshApplications: async () => {
        try {
            const response = await axios.get(`/api/get-applications`);
            if(response.data.success) {
                set({ applications: response.data.applications.filter((app: JobApplication) => !app.isArchived) });
                set({ archivedApplications: response.data.applications.filter((app: JobApplication) => app.isArchived) });
                set({ trashCount: response.data.applications.filter((app: JobApplication) => app.isArchived).length});
            }
        } catch (error) {
            console.error('Failed to fetch applications', error);
        }
    }, 
    setTrashCount: (count: number) => {
        set({ trashCount: count });
    }

}));