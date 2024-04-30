"use client";

import { ImagePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute z-10 top-2 right-2">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  onRemove(url);
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image src={url} fill className="object-cover" alt="Image" />
          </div>
        ))}
        <div>
          <CldUploadWidget onUpload={onUpload} uploadPreset="obunkar6">
            {({ open }) => {
              return (
                <Button
                  onClick={() => {
                    open();
                  }}
                  type="button"
                  variant="secondary"
                  disabled={disabled}
                >
                  <ImagePlus className="h-4 w-4 mr-2" />
                  Upload an Image
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
