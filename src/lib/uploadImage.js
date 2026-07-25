export const uploadImage = async (imageFile) => {
    const formData = new FormData();

    formData.append("image", imageFile);

    const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        {
            method: "POST",
            body: formData,
        }
    );

    // console.log("Status:", res.status);

    const data = await res.json();
    // console.log("Response:", data);

    return data.data.url;

};