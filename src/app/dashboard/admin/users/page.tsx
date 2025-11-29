'use server'
import { getAllUserData } from "./getAllUserData"



export default async function UserPages() {
    const data = await getAllUserData()
    return (
        <div>

        </div>
    )
}







