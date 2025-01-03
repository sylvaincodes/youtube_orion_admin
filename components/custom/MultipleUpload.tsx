"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import * as React from "react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  deleteImages?: () => void;
  value: string[];
}

const MultipleUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  deleteImages,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 overflow-y-auto w-fit">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Zoom>
              <Image fill className="object-cover" alt="Image" src={url} />
            </Zoom>
          </div>
        ))}
      </div>
      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <>
              <div className="flex gap-4 items-center">
                <Button
                  type="button"
                  disabled={disabled}
                  variant="secondary"
                  onClick={onClick}
                >
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Upload an Image
                </Button>

                <Button
                  type="button"
                  disabled={disabled}
                  variant="destructive"
                  onClick={deleteImages}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete all
                </Button>
              </div>
            </>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default MultipleUpload;
