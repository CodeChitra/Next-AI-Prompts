"use client";
import { useEffect, useState } from "react"
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {

    if (data.length === 0) {
        return <div className="mt-16 prompt_layout">
            No Results Found...
        </div>
    }
    return <div className="mt-16 prompt_layout">
        {data.map(post => {
            return <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
        })}
    </div>
}

const Feed = () => {

    const fetchPosts = async (filterString) => {
        let response;
        if (filterString != null && filterString !== "") {
            response = await fetch(`api/prompt?filterString=${filterString}`);
        }
        else {
            response = await fetch("/api/prompt");
        }
        const data = await response.json();
        setPosts(data);
    }

    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);

        let timer;

        return (function () {
            clearTimeout(timer);
            timer = setTimeout(() => {

                fetchPosts(e.target.value);
            }, 500);
        })();
    }

    useEffect(() => {
        fetchPosts();
    }, [])
    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input type="text" placeholder="Search for a tag or a specific prompt" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={(tag) => { setSearchText(tag); fetchPosts(tag) }}
            />
        </section>
    )
}

export default Feed
