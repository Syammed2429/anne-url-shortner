import { FC, useState } from 'react'
import axios from 'axios';
import {
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    Flex,
    Box,
} from '@chakra-ui/react'
import { AiOutlineLink } from "react-icons/ai"
import { CopyButton } from './CopyButton';



const URL: FC = () => {
    const [url, setUrl] = useState<string | "">("")
    const [customName, setCustomName] = useState<string | null>(null)
    const [shortenUrl, setShortenUrl] = useState<any | null>(null)

    let isError = url === ""

    const isErrorr = customName === ''

    const API: string | undefined = process.env.REACT_APP_API


    const shortUrl = async () => {
        //Shorten the url
        const { data } = await axios.get(`${API}`, {
            params: {
                url: url,
                custom: customName
            }
        })
        setShortenUrl(data)



    }


    if (shortenUrl === undefined) {
        var value: any = "Custom name is already used please use different Custom Name"
    }




    return (
        <>
            <Container py={50}>

                <FormControl isInvalid={isError}>
                    <FormLabel htmlFor='email'>URL</FormLabel>
                    <Input
                        id='email'
                        type='url'
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Add a url to shorten"
                    />
                    {!isError ? (
                        <FormHelperText>
                            Enter the url you'd like to short.
                        </FormHelperText>
                    ) : (
                        <FormErrorMessage>url is required.</FormErrorMessage>
                    )}
                </FormControl>


                <FormControl my={5}>
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

                {isError ? null :
                    <div>
                        <Button
                            my={3}
                            onClick={shortUrl}
                            leftIcon={<AiOutlineLink />}
                            colorScheme='pink' variant='solid'>
                            Short URL
                        </Button>

                    </div>}

                <div>



                </div>
                <div>
                    {value}
                </div>
                {shortenUrl ?
                    <Box bg='#48BB78' w='100%' p={4} color='white' my={4}>

                        <Flex
                            justify="space-around"
                            align="center"

                        >
                            <Box color="black" fontSize='20px'>

                                <div><a href={shortenUrl} target="_blank" rel="noreferrer">{shortenUrl}</a></div>
                            </Box>
                            <CopyButton shortenUrl={shortenUrl} />
                        </Flex>
                    </Box>
                    : null
                }

            </Container>
        </>
    )
}

export { URL }
