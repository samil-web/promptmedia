"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

const MyProfile = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [myPosts, setMyPosts] = useState([])
    useEffect(() => {
        const getUserData = async () => {
            const response = await fetch(`/api/users/${session?.user.id}` + "/posts")
            // console.log(response.json())
            const userData = await response.json()
            setMyPosts(userData)
        }
        if (session?.user.id) getUserData()
    }, [session?.user.id])
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this prompt?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredmyPosts = myPosts.filter((item) => item._id !== post._id);

                setMyPosts(filteredmyPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };
    // we should fetch the data but take only what each person has posted
    // should we create new api endpoint?

    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile