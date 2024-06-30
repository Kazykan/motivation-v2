import { ChildService } from "@/service/child.service"
import {useQuery} from "@tanstack/react-query"



const useChildQuery = (bot_user_id: number) => {
    return useQuery({
        queryFn: () => ChildService.getChild(bot_user_id),
        queryKey: ["child", bot_user_id],
    })
}

export {useChildQuery}