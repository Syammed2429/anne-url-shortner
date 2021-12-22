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
} from '@chakra-ui/react'



const URL: FC = () => {
    const [url, setUrl] = useState<string | null>(null)
    const [customName, setCustomName] = useState<string | null>(null)
    const [shortenUrl, setShortenUrl] = useState<any | null>(null)


    const isError = url === ''


    const API: any = process.env.REACT_APP_API

    console.log('API:', API)
    console.log('API:', API)

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



                <input
                    onChange={(e) => setUrl(e.target.value)}
                    type="text"
                    placeholder="Enter the url" />
                <input
                    onChange={(e) => setCustomName(e.target.value)}
                    type="text"
                    placeholder="Enter the custom name" />
                <button
                    onClick={shortUrl}
                >Short URL</button>
                <div id="myInput">{shortenUrl}</div>
                <button onClick={copyToClipboard}>Copy text</button>
                <div>
                    {value}
                </div>
            </Container>
        </>
    )
}

export { URL }
