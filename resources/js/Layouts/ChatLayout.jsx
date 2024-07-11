import {usePage} from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ChatLayout = ({children}) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    console.log('conversations', conversations)
    console.log('selectedConversation', selectedConversation)
    return (
        <>
            ChatLayout
            <div>{children}</div>
        </>
    )
}
export default ChatLayout;
