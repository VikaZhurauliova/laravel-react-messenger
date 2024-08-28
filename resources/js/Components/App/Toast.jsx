import {useEffect, useState} from "react";
import {useEventBus} from "@/EventBus.jsx";
import { v4 as uuid4 } from "uuid";

export default function Toast({ }) {
    const [toasts, setToasts] = useState([]);
    const { on } = useEventBus();

    useEffect(() => {
        on('toast.show', (message) => {
            const uuid = uuid4();

            setToasts((oldToasts) => [...oldToasts, {message, uuid}]);

            setTimeout(() => {
                setToasts((oldToasts) =>
                    oldToasts.filter((toast) => toast.uuid !== uuid)
                );
            }, 5000);
        });
    }, [on]);
    return (
        <div className="toast min-w-[240px]">
            {toasts.map((toast) => (
                <div
                    key={toast.uuid}
                    className="alert alert-success py-3 px-4 text-gray-100 rounded-md"
                >
                    <span>{toast.message}</span>
                </div>
            ))}
        </div>
    );
}
