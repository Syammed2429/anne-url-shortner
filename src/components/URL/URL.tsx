import { FC, useState, useEffect } from 'react'
import axios from 'axios';
import { Container } from '@chakra-ui/react'
import copy from "copy-to-clipboard";



const URL: FC = () => {
    const [url, setUrl] = useState<string | null>(null)
    const [customName, setCustomName] = useState<string | null>(null)
    const [shortenUrl, setShortenUrl] = useState<any | null>(null)


    const shortUrl = async () => {
        const { data } = await axios.get(`https://ulvis.net/API/write/get`, {
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
