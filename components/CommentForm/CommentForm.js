import { submitComment } from "../../services";
import {useState } from "react";

const CommentsForm = ({ben, slug}) =>{
    const [formValidation, setFormValidation] = useState(false);
    const [commentSubmitted, setCommentSubmitted] = useState(false);
    const [name, setName] = useState('')
    const [text, setText] = useState('')

    const changeNameValue = (e) =>{
        setName(e.target.value)
    }
    const changeTextValue = (e) =>{
        setText(e.target.value)
    }
    
    const handleCommentSubmission = (e) =>{
        e.preventDefault()
        let commentObj = {name,text,slug}
        if(name !== "" && text !== ""){
            submitComment(commentObj)
                .then((res) =>{
                    setName('')
                    setText('')
                    if(res.status === 200){
                        setCommentSubmitted(true)
                        const timer = setTimeout(() =>{
                            setCommentSubmitted(false)
                        }, 5000)
                        return () => clearTimeout(timer)
                    }
                })
        } else {
            setFormValidation(true)
            const timer = setTimeout(() =>{
                setFormValidation(false)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }

    return(
        <form onSubmit={handleCommentSubmission} className="bg-white md:w-9/12 sm:w-full rounded-xl p-4 flex flex-col gap-4">
            <h3 className="font-semibold text-xl">Berichten form</h3>
            <hr />
            <div className="flex flex-col">
                <input onChange={changeNameValue} value={name} placeholder="Naam" type="text" id="commentName" className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"/>
            </div>
            <div className="flex flex-col">
                <textarea onChange={changeTextValue} value={text} placeholder="Bericht" type="text" id="commentText" className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"/>
            </div>
            {formValidation && (
                <span className="bg-red-100 p-2 rounded-lg text-red-700">Vul alle vakken in!</span>
            )}
            {commentSubmitted && (
                <span className="bg-green-100 p-2 rounded-lg text-green-700">Bericht succesvol gestuurd voor review!</span>
            )}
            <div>
                <button  className="transition duration-500 transform hover:-translate-y-1 inline-block bg-pink-600 text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Versturen!</button>
            </div>
        </form>
    )
}

export default CommentsForm;