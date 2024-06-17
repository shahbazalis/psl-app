import {
    LogOut,
  } from "lucide-react";
  import { Button } from "./ui/button";
 
function Logout() {
  return (
    <div className='relative flex justify-end '>
      <Button
          //onClick={}
         className=" rounded-full p-2 bg-orange-400"
        >
          <LogOut />
        </Button>
    </div>
  )
}
 
export default Logout