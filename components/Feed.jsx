
'use client'
import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div>
            {data.map((post) => (
                <PromptCard
                    post={post}
                    key={post._id}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}
const Feed = () => {
    // promptcard - user image,gmail,prompt,hashtag
    // how to get these data? 
    // fetch the data from the database and display it
    const [searchText, setSearchText] = useState("")
    const [allPosts, setAllPosts] = useState([])
    const [searchedResults, setSearchedResults] = useState([]);
    const handleTagClick = (tagName) => {
        setSearchText(tagName)
        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    }
    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        );
    }

    const getUserData = async () => {
        const response = await fetch("/api/prompt")
        const userData = await response.json()
        setAllPosts(userData)
    }
    useEffect(() => {
        getUserData()
    }, [])
    return (
        <section className='feed'>
            {/*place form in the center with padding */}
            <form className='w-full max-w-2xl flex flex-col gap-7'>
                {/*add input in the center with padding */}
                <input className='form_input'
                    type='text'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    required
                    placeholder='Search for a tag or username here'>
                </input>
            </form>
            {searchText ? <PromptCardList data={searchedResults} handleTagClick={handleTagClick} /> :
                <PromptCardList data={allPosts} handleTagClick={handleTagClick} />}

        </section>
    )
}

export default Feed