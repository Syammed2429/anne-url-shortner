import { FC, useState } from 'react'
import axios from 'axios';
import copy from "copy-to-clipboard";
import {
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
} from '@chakra-ui/react'
import { AiOutlineLink } from "react-icons/ai"
import { FaCopy } from "react-icons/fa"

// AiOutlineLink
// FaCopy


const URL: FC = () => {
    const [url, setUrl] = useState<string | null>(null)
    const [customName, setCustomName] = useState<string | null>(null)
    const [shortenUrl, setShortenUrl] = useState<any | null>(null)


    const isError = url === ''
    const isErrorr = customName === ''


    const API: any = process.env.REACT_APP_API


    const shortUrl = async () => {
        const { data } = await axios.get(API, {
            params: {
                url: url,
                custom: customName

            }
        })
        setShortenUrl(data.data.url)
    }

    if (shortenUrl === undefined) {
        var value: any = "Custom name is already used please use different Custom Name"
    }



    const copyToClipboard = () => {
        copy(shortenUrl);
        alert(`You have copied "${shortenUrl}"`);
    }

    return (
        <>
            <Container>

                <FormControl isInvalid={isError}>
                    <FormLabel htmlFor='email'>URL</FormLabel>
                    <Input
                        id='email'
                        type='url'
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    {!isError ? (
                        <FormHelperText>
                            Enter the url you'd like to short.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>url is required.</FormErrorMessage>
                    )}
                </FormControl>


                <FormControl >
                    <FormLabel htmlFor='email'>Custom Name</FormLabel>
                    <Input
                        id='name'
                        type='text'
                        onChange={(e) => setCustomName(e.target.value)}
                    />
                    {!isErrorr ? (
                        <FormHelperText>
                            Enter the custom name. It's an optional.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>It's an optional.</FormErrorMessage>
                    )}
                </FormControl>

                <Button
                    onClick={shortUrl}
                    leftIcon={<AiOutlineLink />}
                    colorScheme='pink' variant='solid'>
                    Short Url
                </Button>

                <div>

                    <div id="myInput">{shortenUrl}</div>
                    <Button
                        onClick={copyToClipboard}
                        rightIcon={<FaCopy />}
                        colorScheme='blue' variant='solid'>
                        Copy URL
                    </Button>
                </div>


                <div>
                    {value}
                </div>
            </Container>
        </>
    )
}

export { URL }
