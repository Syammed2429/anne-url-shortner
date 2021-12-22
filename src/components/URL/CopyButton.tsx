import { useRef } from 'react'
import copy from "copy-to-clipboard";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
    AlertDialogCloseButton,
    Container,
} from '@chakra-ui/react'
import { FaCopy } from "react-icons/fa"


const CopyButton = ({ shortenUrl }: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<any>()

    const copyToClipboard = () => {
        copy(shortenUrl);
    }

    if (!shortenUrl) {
        return null
    }

    return (
        <>
            <Button
                rightIcon={<FaCopy />}
                variant='solid'
                bg='#285E61'
                onClick={() => {
                    onOpen()
                    copyToClipboard()
                }}>Copy URL</Button>
            <AlertDialog
                motionPreset='scale'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Shorten URl Copied 😍 </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        The new shorten url is <a href={shortenUrl} title="go to the site">{shortenUrl}</a>
                    </AlertDialogBody>
                    <AlertDialogFooter>

                        <Button onClick={onClose} colorScheme='teal' ml={3}>
                            Enjoy
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export { CopyButton }
