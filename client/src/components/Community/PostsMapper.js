import React from 'react'
import { useSelector } from 'react-redux'
import PostShort from '../Post/PostShort'

export default function PostsMapper() {
    const posts=useSelector(posts)
    return (
        <div>
           Hey
        </div>
    )
}
