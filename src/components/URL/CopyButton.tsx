import { useState, useRef } from 'react'
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
} from '@chakra-ui/react'
import { FaCopy } from "react-icons/fa"


const CopyButton = ({ copyUrl, shortenUrl }: any) => {
    console.log('shortenUrl:', shortenUrl)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<any>()

    const copyToClipboard = () => {
        copy(shortenUrl);
        <div>(`You have copied "${shortenUrl}"`)</div>
    }

    return (
        <>
            <Button
                rightIcon={<FaCopy />}
                variant='solid'
                onClick={() => {
                    onOpen()
                    copyToClipboard()
                }}>Copy URL</Button>
            <AlertDialog
                motionPreset='slideInRight'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to discard all of your notes? 44 words will be
                        deleted.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='red' ml={3}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export { CopyButton }
