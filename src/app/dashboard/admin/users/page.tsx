'use server'
import { getAllUserData } from "./getAllUserData"



export default async function UserPages() {
    const data = await getAllUserData()
    console.log(data)
    return (
        <div>

        </div>
    )
}







