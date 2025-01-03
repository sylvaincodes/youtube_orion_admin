"use client";

import React from "react";
import { Button } from "../ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { CldUploadWidget } from "next-cloudinary";

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}) {
  function onUpload(result: any) {
    onChange(result.info.secure_url);
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {value && (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="absolute right-4 top-4 z-10">
              <Button
                onClick={() =>
                  onRemove(
                    "https://cdn-icons-png.flaticon.com/128/10446/10446694.png"
                  )
                }
                type="button"
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            <Zoom>
              <Image
                className="w-auto h-auto object-cover "
                src={value}
                alt="image"
                fill
                sizes="100"
              />
            </Zoom>
          </div>
        )}
      </div>
      {/* CLoudinary widget */}
      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              disabled={disabled}
              type="button"
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
