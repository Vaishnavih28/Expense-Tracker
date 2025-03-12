import { Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar"
import { useAuthContext } from "@/context/AuthContext"

const Header = ()=>{
    const {authUser } = useAuthContext();


    return(
        <div className="p-5 flex shadow-sm border-b justify-between">
        <div>
            
        </div>
        <div>
        <Avatar className="w-8 h-8 rounded-full">
      <AvatarImage src={authUser.profilePic} alt="Icon" />
      <AvatarFallback>{authUser.fullname?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>

        </div>
        </div>

    )
}
export default Header