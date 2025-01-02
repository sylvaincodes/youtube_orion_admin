"use client";
import { Copy, Edit, MoreHorizontal } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "./columns";
import { toast } from "@/hooks/use-toast";
// import { Alert } from "@/components/custom/Alert";
import React from "react";

interface CellActionProps {
  data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  // const [openAlert, setOpenAlert] = useState<boolean>(false);
  // const [loading, setLoading] = useState(false);

  // const onConfirm = async () => {
  //   try {
  //     setLoading(true);
  //     await axios.delete(`/api/brands/${data._id}`);
  //     toast({
  //       variant: "default",
  //       title: "Well done ✔️",
  //       description: "Brand is deleted",
  //     });
  //     router.refresh();
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "Error occur ",
  //       description: "Retry",
  //     });
  //   } finally {
  //     setOpenAlert(false);
  //     setLoading(false);
  //   }
  // };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      variant: "default",
      title: "Well done ✔️",
      description: "Brand id copied",
    });
  };

  return (
    <>
      {/* <Alert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        onConfirm={onConfirm}
        isDeleting={loading}
      /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data._id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/stores/${params.storeId}/products/${data._id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => setOpenAlert(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
