import { useEffect, useRef, useState } from "react";
import { useUploadImage } from "../apis/mutations/use-upload-image";
import { cn } from "@/shared/lib/tailwind-merge";
import { CloudUpload, Download, FileImage, Loader2, Trash2 } from "lucide-react";

interface ImageProps {
  value?: string;
  onChange?: (url: string) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileName(url?: string): string {
  if (!url) {
    return "";
  }

  const parts = url.split("/");

  return decodeURIComponent(
    parts[parts.length - 1].split("?")[0],
  );
}

export default function ImageDrop({ value, onChange }: ImageProps) {
    const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageName, setImageName] = useState("");
  
  const [imageSize, setImageSize] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(value);

  const { mutate: uploadImage, isPending } = useUploadImage();

    useEffect(() => {
    if (!value) return;
    fetch(value, { method: "HEAD" })
      .then((res) => {
        const cl = res.headers.get("Content-Length");
        if (cl) setImageSize(Number(cl));
      })
      .catch(() => {});
  }, [value]);

  const handleFile = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    const localPreview = URL.createObjectURL(file);

    setImageName(file.name);
    setImageSize(file.size);
    setPreviewUrl(localPreview);
    setError(null);

    uploadImage(file, {
      onSuccess: (data) => {
        URL.revokeObjectURL(localPreview);
        onChange?.(data.url);
      },
      onError: (err) => {
        setError(err.message);
        URL.revokeObjectURL(localPreview);
        setPreviewUrl(undefined);
        setImageName("");
        setImageSize(0);
      },
    });
  };

  const imageUrl = previewUrl ||value;
    const valueName=getFileName(value)
    const imageN=imageName||valueName


  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
      className={cn(
        "border flex items-center",
        imageUrl?"p-0":"p-6",
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
      )}
    >
      {imageUrl ? (
        <div className="w-full bg-gray-50 flex items-center justify-between">
          <img
            src={imageUrl}
            alt="uploadImage"
            className="w-22 h-22 shrink-0 object-cover"
          />
          <p className="text-gray-600 text-sm font-mono truncate">{imageN}</p>
          <div className="flex items-center p-2.5 gap-2.5">
            {imageSize > 0 && (
              <span className="text-gray-400 font-mono text-xs border-r pr-2 border-gray-200">
                {formatFileSize(imageSize)}
              </span>
            )}
            <Download
              className="size-4.5 text-blue-500 cursor-pointer"
              onClick={async () => {
                if (!imageUrl) return;
                try {
                  const res = await fetch(imageUrl);
                  const blob = await res.blob();
                  const blobUrl = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = blobUrl;
                  a.download = imageName || "image";
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(blobUrl);
                } catch {
                  window.open(imageUrl, "_blank");
                }
              }}
            />
            <Trash2
              className="size-4.5 text-red-500 cursor-pointer"
              onClick={() => {
                setPreviewUrl(undefined);
                setImageName("");
                setImageSize(0);
                setError(null);
                onChange?.("");
              }}
            />
          </div>
        </div>
      ) : (
        <>
          <FileImage className="size-10 text-gray-200" />
          <div className="flex flex-1 items-center justify-center gap-2.5 text-gray-600">
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <span className="flex items-center gap-2.5 font-mono text-xs">
                <CloudUpload className="size-6" />
                Drop an image here or{" "}
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="cursor-pointer text-blue-600"
                >
                  select from your computer
                </button>
              </span>
            )}
          </div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </>
      )}

      {error && <p className="font-mono text-sm text-red-600">{error}</p>}
    </div>
  );
}