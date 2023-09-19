"use client";
import Profile from '@components/Profile'
import React, { useEffect, useState } from 'react'

const UserProfile = ({ params }) => {

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const getPosts = async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }

    const getUser = async (url) => {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }
    useEffect(() => {
        const fetchPosts = async () => {

            const [userData, postData] = await Promise.all([
                getPosts(`/api/users/${params.id}`),
                getUser(`/api/users/${params.id}/posts`)
            ])
            setPosts(postData);
            setUser(userData);
        }

        if (params?.id)
            fetchPosts();
    }, [])


    return (
        <Profile
            name={user.username}
            desc="Welcome to your personalized profile page"
            data={posts}
        />
    )
}

export default UserProfile;

