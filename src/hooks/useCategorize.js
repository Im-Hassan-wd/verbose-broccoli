import { useEffect, useState } from "react";

export const useCategorize = (postContent) => {
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(async () => {
    setIsPending(true);

    const formdata = new FormData();
    formdata.append("key", "603d4cd6e7612cba7091153d8a863691");
    formdata.append("txt", postContent);
    formdata.append("model", "IPTC_en");

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.meaningcloud.com/class-2.0",
        requestOptions
      );

      const data = await response.json();

      if (data) {
        setCategory(data.category_list[0].label);
        setIsPending(false);
      }
    } catch (error) {
      setError(error);
      setIsPending(false);
    }
  }, [postContent]);

  return { category, error, isPending };
};
