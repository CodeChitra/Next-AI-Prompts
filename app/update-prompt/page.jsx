"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Form from "@components/Form";
const EditPrompt = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const promptId = searchParams.get("id");
    const [submittingPost, setSubmittingPost] = useState(false);
    const [post, setPost] = useState({
        prompt: "",
        tag: ""
    })

    useEffect(() => {
        const getPromptDetail = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })

        }
        if (promptId)
            getPromptDetail();
    }, [promptId])

    const editPrompt = async (e) => {

        e.preventDefault();
        setSubmittingPost(true);
        if (!promptId)
            return alert("Prompt id not found");

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                })
            })
            if (response.ok) {
                router.push("/");
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setSubmittingPost(false);
        }
    }
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submittingPost={submittingPost}
            handleSubmitPost={editPrompt}
        />
    )
}

export default EditPrompt;
