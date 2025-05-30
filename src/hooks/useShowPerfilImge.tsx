import React, { useEffect, useState } from "react";
import { DoctorService } from "../services/doctor";
import { fixUrl } from "../helpers";

interface User {
  id?: string;
}

const useShowPerfilImagen = (user: User) => {
  const doctorService = new DoctorService();

  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!user?.id) {
        setProfileImageUri(null);
        setLoadingImage(false);
        return;
      }

      setLoadingImage(true);

      try {
        const imageUrl = await doctorService.getProfileImage(user.id);
        setProfileImageUri(fixUrl(imageUrl));
      } catch (error) {
        console.error("Error loading profile image:", error);
        setProfileImageUri(null);
      } finally {
        setLoadingImage(false);
      }
    };

    fetchProfileImage();
  }, [user?.id]);

  return {
    profileImageUri,
    loadingImage,
  };
};

export default useShowPerfilImagen;
