import {useEffect, useState} from "react";
import {useEventBus} from "@/EventBus.jsx";
import { v4 as uuid4 } from "uuid";
import UserAvatar from "@/Components/App/UserAvatar.jsx";
import {Link} from "@inertiajs/react";

export default function NewMessageNotification({ }) {
    const [toasts, setToasts] = useState([]);
    const { on } = useEventBus();

    useEffect(() => {
        on('newMessageNotification', ({message, user, group_id}) => {
            const uuid = uuid4();

            setToasts((oldToasts) => [
                ...oldToasts,
                {message, uuid, user, group_id},
            ]);

            setTimeout(() => {
                setToasts((oldToasts) =>
                    oldToasts.filter((toast) => toast.uuid !== uuid)
                );
            }, 5000);
        });
    }, [on]);
    return (
        <div className="toast toast-top toast-center min-w-[240px]">
            {toasts.map((toast) => (
                <div
                    key={toast.uuid}
                    className="alert alert-success py-3 px-4 text-gray-100 rounded-md"
                >
                   <Link
                        href={
                            toast.group_id
                                ? route('chat.group', toast.group_id)
                                : route('chat.user', toast.user.id)
                        }
                        className="flex items-center gap-2"
                   >
                       <UserAvatar user={toast.user} />
                       <span>{toast.message}</span>
                   </Link>
                </div>
            ))}
        </div>
    );
}
