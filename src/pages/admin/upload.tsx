import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadResults: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name.toLowerCase().replace(/\s+/g, "-");

      const { data, error } = await supabase.storage
        .from("products")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        uploadResults.push(`❌ ${file.name}: ${error.message}`);
      } else {
        const { data: urlData } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);
        uploadResults.push(`✅ ${file.name} → ${urlData.publicUrl}`);
      }
    }

    setResults(uploadResults);
    setUploading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Upload Images Produits
      </h1>

      <input
        type="file"
        accept="image/webp,image/png,image/jpeg"
        multiple
        onChange={handleUpload}
        disabled={uploading}
      />

      {uploading && <p style={{ marginTop: "20px" }}>Upload en cours...</p>}

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Résultats :</h2>
          {results.map((r, i) => (
            <p key={i} style={{ fontSize: "14px", marginBottom: "4px" }}>{r}</p>
          ))}
        </div>
      )}
    </div>
  );
}