import { useState, useEffect } from "react";
import { getChannelSettings, updateChannelSettings } from "../../api";
import { toast } from "react-hot-toast";

export const useChannelSettings = () => {
  const [channelSettings, setChannelSettings] = useState(null);

  const fetchChannelSettings = async () => {
    const response = await getChannelSettings();

    if (response.error) {
      return toast.error(
        response.exception?.response?.data ||
          "Error occurred while fetching channel settings"
      );
    }

    setChannelSettings({
      username: response.data.username,
      title: response.data.title,
      description: response.data.description,
      avatarUrl: response.data.avatarUrl,
      streamKey: response.data.streamKey,
    });
  };

  const saveSettings = async (data) => {
    const response = await updateChannelSettings(data);

    if (response.error) {
      return toast.error(
        response.exception?.response?.data ||
          "Error occurred while saving channel settings"
      );
    }

    toast.success("channel settings saved successfully");
  };
  useEffect(() => {
    fetchChannelSettings();
  }, []);

  return {
    isFetching: !channelSettings,
    channelSettings,
    saveSettings,
  };
};
