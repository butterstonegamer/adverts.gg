import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getUserDetails, postBecomeSeller, postAddServer, getServers, postBrowseServers, postCheckout } from '../../utils/api'
import '../Browse/Browse.css'
import { PayPalButton } from "react-paypal-button-v2";
import axios from 'axios';
import {Menu, Input, Tooltip, Textarea, Alert, AlertIcon, AlertTitle, AlertDescription, InputGroup, InputLeftAddon, Slider, SliderTrack, Box, SliderFilledTrack, SliderThumb, Select, Stack, Checkbox, Divider, Center, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider, Button, Avatar, AvatarBadge, AvatarGroup, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,DrawerCloseButton, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, FormControl,FormLabel,FormErrorMessage,FormHelperText,Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,Popover,PopoverTrigger,PopoverContent,PopoverHeader,PopoverBody,PopoverFooter,PopoverArrow,PopoverCloseButton,} from "@chakra-ui/react"
export function Browse({
    history,
} ) {

    const [user, setUser] = React.useState(null);
    const [servers, setServers] = React.useState(null);
    const [userImage, setUserImage] = React.useState(null);
    const [seller, setSeller] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [loading1, setLoading1] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpen1, setIsOpen1] = React.useState(false);

    const [maxPrice, setmaxPrice] = React.useState(100);
    const [minPrice, setminPrice] = React.useState(0);
    const [maxServerSize, setmaxServerSize] = React.useState(1000000);
    const [minServerSize, setminServerSize] = React.useState(100);
    const [maxOnline, setmaxOnline] = React.useState(1000000);
    const [minOnline, setminOnline] = React.useState(10);
    const [catagory, setCatagory] = React.useState('All');
    const [sort, setSort] = React.useState('MC-HL');
    const [adType, setadType] = React.useState('All');
    const [page, setpage] = React.useState(0);

    const [selectedServerName, setSelectedServerName] = React.useState(null);
    const [selectedServerId, setSelectedServerId] = React.useState(null);
    const [selectedServerDescription, setSelectedServerDescription] = React.useState(null);
    const [selectedServerIcon, setSelectedServerIcon] = React.useState(null);
    const [selectedMemberCount, setSelectedMemberCount] = React.useState(null);
    const [selectedOnlineCount, setSelectedOnlineCount] = React.useState(null);
    const [selectedInvite, setSelectedInvite] = React.useState(null);
    const [selectedCost, setSelectedCost] = React.useState(null);

    const [message, setMessage] = React.useState(null);
    const [order, setOrder] = React.useState(null);

    const [contactEmail, setContactEmail] = React.useState(null);


    const sellerClick = () => history.push('/seller');
    const dashboardClick = () => history.push('/dashboard');
    const browseClick = () => history.push('/browse');
    const historyClick = () => history.push('/history');
    const settingsClick = () => history.push('/settings');

    const onClose = () => setIsOpen(false)
    const onClose1 = () => setIsOpen1(false)

    let newSetAd = (e) => {
        let inputValue = e.target.value
        inputValue = inputValue.replace(/\n\r?/g, '<br />');
        setMessage(inputValue)
    }

    const viewServer = (name, icon, description, membercount, onlinecount, invite, cost, id) => {
        setOrder(null)
        setSelectedServerName(name);
        setSelectedServerDescription(description);
        setSelectedServerIcon(icon);
        setSelectedMemberCount(membercount);
        setSelectedOnlineCount(onlinecount);
        setSelectedInvite(invite);
        setSelectedCost(cost);
        setSelectedServerId(id);
        setIsOpen(true);
    }

    const createOrderFunction = () => {
        open()
        postCheckout(selectedServerId, message, user.discordId).then(({data}) => {
            window.location.href = data;
        }).catch((err) => {
            console.log(err)
            history.push('/');
        })
    }

    const newPageSelection = (newValue) => {
        try {
            if(newValue < 0) {
                newValue = 0
            }
            setpage(newValue)
            postBrowseServers(maxPrice, minPrice, maxServerSize, minServerSize, maxOnline, minOnline, catagory, sort, adType, newValue)
            .then(({data}) => {
                setServers(data);
            }).catch((err) => {
                console.log(err)
                history.push('/');
            })
        } catch (error) {
            setpage(0);
        }
    }

    const postSeller = (e, email) => {
        function validateEmail(mail) {
            var re = /\S+@\S+\.\S+/;
            return re.test(mail);
        }
        let validatedEmail = validateEmail(email)
        if(validatedEmail == true) {
            postBecomeSeller(email, user.discordId)
            history.push('/seller');
        } else {
            document.getElementById('contactEmailInput').style.border = "solid 2px red";
        }
    }
    

    const newSelection = () => {
        var selectedCatagory = document.getElementById("SelectCatagory").value;
        var selectedSort = document.getElementById("SelectSort").value;
        var selectedPing = document.getElementById("SelectPing").value;
        var selectedMaxPrice = parseFloat(document.getElementById("SelectMaxPrice").value);
        var selectedMinPrice = parseFloat(document.getElementById("SelectMinPrice").value);
        var selectedMaxSize = parseFloat(document.getElementById("SelectMaxSize").value);
        var selectedMinSize = parseFloat(document.getElementById("SelectMinSize").value);
        var selectedMaxOnlineSize = parseFloat(document.getElementById("SelectMaxOnlineSize").value);
        var selectedMinOnlineSize = parseFloat(document.getElementById("SelectMinOnlineSize").value);
        postBrowseServers(selectedMaxPrice, selectedMinPrice, selectedMaxSize, selectedMinSize, selectedMaxOnlineSize, selectedMinOnlineSize, selectedCatagory, selectedSort, selectedPing, page)
        .then(({data}) => {
            setServers(data);
            setCatagory(selectedCatagory)
            setSort(selectedSort)
            setadType(selectedPing)
            setmaxPrice(selectedMaxPrice)
            setminPrice(selectedMinPrice)
        }).catch((err) => {
            console.log(err)
            history.push('/');
        })
    }

    const cancelRef = React.useRef()
    const cancelRef1 = React.useRef()

    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
    const open = () => setIsPopoverOpen(!isPopoverOpen)
    const close = () => setIsPopoverOpen(false)

    React.useEffect( () => {
        postBrowseServers(maxPrice, minPrice, maxServerSize, minServerSize, maxOnline, minOnline, catagory, sort, adType, page)
        .then(({data}) => {
            setServers(data);
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            history.push('/');
        })
        getUserDetails()
        .then(({data}) => {
            console.log(data);
            setUser(data);
            setUserImage(('https://cdn.discordapp.com/avatars/' + data.discordId + '/' + data.avatar + '.png'));
            console.log(userImage)
            if(data.seller == true) {
                setSeller(true)
            }
            setLoading1(false)
        }).catch((err) => {
            console.log(err)
            history.push('/');
            setLoading(false);
        })
    },[]);

    return !loading && !loading1 &&(
        <div>
            <div className="background1">
            </div>
            <div id="navbar">
                <img id="logo1"/>
                <Menu>
                <div id="profilebutton"><MenuButton w="40" as={Button} colorScheme="white"><a id="username">{user.username}</a><Avatar id="avatar" name="Dan Abrahmov" src={userImage} w="10" h="10"/></MenuButton></div>
                <MenuList>
                    <MenuGroup title="Profile">
                        <MenuItem onClick={(e) => history.push('/dashboard')}>Dashboard</MenuItem>
                        <MenuItem onClick={(e) => history.push('/history')}>Order History</MenuItem>
                        {seller
                        ? <MenuItem onClick={(e) => history.push('/seller')}>Seller Dashboard </MenuItem>
                        : <MenuItem onClick={() => setIsOpen(true)}>Become A Seller</MenuItem>
                        }
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title="Help">
                        <MenuItem>Settings</MenuItem>
                        <MenuItem onClick={(e) => history.push('/')}>Log Out</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
            </div>
            <div id="sideBar">
            <div id="buttons">
                <Button id="sideBarButton" colorScheme="blue" onClick={dashboardClick}>Dashboard</Button><br/>
                {seller
                    ? <Button id="sideBarButton" colorScheme="blue" onClick={sellerClick}>Seller Dashboard</Button>
                    : <Button id="sideBarButton" colorScheme="blue" onClick={() => setIsOpen1(true)}>Become A Seller</Button>
                }
                <br/><Button id="sideBarButton" colorScheme="blue" onClick={browseClick}>Browse Ads</Button><br/>
                <Button id="sideBarButton" colorScheme="blue" onClick={historyClick}>Order History</Button><br/>
                <Button id="sideBarButton" colorScheme="blue" onClick={settingsClick}>Settings</Button>
                </div>
            </div>
            <div id="ContentArea1">
                    <div id="WelcomeMenu">
                        <h1 id="welcome">Browse Servers</h1><br/>
                    </div>
                    <div id="StatsMenu">
                        <div id="filterMenu">
                            <a id="filterText"> Filter Servers</a>
                            <div id="Filters">
                                <div id="filterBox">
                                <FormLabel id="label">Max Price</FormLabel>
                                <Input id="SelectMaxPrice" class="filterInput" type="number" size="sm" placeholder="Max Price" defaultValue="100" onChange={() => newSelection()}/>
                                <FormLabel id="label">Min Price</FormLabel>
                                <Input id="SelectMinPrice"class="filterInput" type="number" size="sm" placeholder="Min Price" defaultValue="0" onChange={() => newSelection()}/>
                                </div>
                                <div id="filterBox">
                                <FormLabel id="label">Max Server Size</FormLabel>
                                <Input id="SelectMaxSize" class="filterInput" type="number" size="sm" placeholder="Max Server Size" defaultValue="1000000" onChange={() => newSelection()}/>
                                <FormLabel id="label">Min Server Size</FormLabel>
                                <Input id="SelectMinSize" class="filterInput" type="number" size="sm" placeholder="Min Server Size" defaultValue="10" onChange={() => newSelection()}/>
                                </div>
                                <div id="filterBox">
                                <FormLabel id="label">Max Online Membercount</FormLabel>
                                <Input id="SelectMaxOnlineSize" class="filterInput" type="number" size="sm" placeholder="Max Online" defaultValue="1000000" onChange={() => newSelection()}/>
                                <FormLabel id="label">Min Online Membercount</FormLabel>
                                <Input id="SelectMinOnlineSize" class="filterInput" type="number" size="sm" placeholder="Min Online" defaultValue="5" onChange={() => newSelection()}/>
                                </div>
                            </div>
                        </div>
                        <div id="orderSelect">
                            <div id="orderSelectBox">
                            <FormLabel id="label">Catagory</FormLabel>
                                <Select class="selectInput" id="SelectCatagory" defaultValue="All" size="sm" variant="filled" onChange={() => newSelection()}>
                                    <option id="selectOption" value="All">All Catagories</option>
                                    <option id="selectOption" value="Community">Community</option>
                                    <option id="selectOption" value="Gaming">Gaming</option>
                                    <option id="selectOption" value="Anime">Anime</option>
                                    <option id="selectOption" value="Meme">Meme</option>
                                    <option id="selectOption" value="Business">Business</option>
                                    <option id="selectOption" value="Crypto">Crypto</option>
                                    <option id="selectOption" value="Giveaway">Giveaway</option>
                                    <option id="selectOption" value="Social">Social</option>
                                    <option id="selectOption" value="Music">Music</option>
                                    <option id="selectOption" value="Roleplay">Roleplay</option>
                                    <option id="selectOption" value="NSFW">NSFW</option>
                                </Select>
                            </div>
                            <div id="orderSelectBox">
                            <FormLabel id="label">Sort By</FormLabel>
                                <Select class="SelectInput" id="SelectSort" defaultValue="MC-LW" placeholder="MemberCount High-Low" size="sm" variant="filled" onChange={() => newSelection()}>
                                    <option  id="selectOption" value="MC-LW">MemberCount Low-High</option>
                                    <option  id="selectOption" value="OC-HL">OnlineCount High-Low</option>
                                    <option  id="selectOption" value="OC-LH">OnlineCount Low-High</option>
                                    <option  id="selectOption" value="P-HL">Price High-Low</option>
                                    <option  id="selectOption" value="P-LH">Price Low-High</option>
                                </Select>
                            </div>
                            <div id="orderSelectBox">
                            <FormLabel id="label">Advertisement Type</FormLabel>
                                <Select class="SelectInput" id="SelectPing" defaultValue="All" placeholder="All Types" size="sm" variant="filled" onChange={() => newSelection()}>
                                    <option id="selectOption" value="noping">No Ping</option>
                                    <option id="selectOption" value="everyone">@everyone</option>
                                </Select>
                            </div>
                        </div>
                        <div id="serversContainer">
                        <Table id="Table"  variant="striped" colorScheme="darkgray" size="sm" >    
                            <TableCaption>
                                <Button id="pageButton" onClick={() => newPageSelection((page-1))}>❮</Button>
                                <Button id="pageButton">{page}</Button>
                                <Button id="pageButton" onClick={() => newPageSelection((page+1))}>❯</Button>
                            </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Server</Th>
                                    <Th>MemberCount</Th>
                                    <Th>Cost</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody id="threadBody">
                                {servers.map(item => {
                                    return <Tooltip label={item.name} aria-label="A tooltip">
                                    <Tr>
                                        <Td><Avatar name={item.name} src={item.icon}/></Td>
                                        <Td>{item.memberCount} | <span id="onlineCount">{item.onlineCount} Online</span></Td>
                                        <Td>${item.cost}.00</Td>
                                        <Td><Button id="viewButton" colorScheme="blue" onClick={() => viewServer(item.name, item.icon, item.description, item.memberCount, item.onlineCount, item.invite, item.cost, item.id)}>View Server</Button></Td>
                                    </Tr>
                                </Tooltip>
		                        })}
                            </Tbody>
                            <Tfoot>
                            </Tfoot>
                        </Table>
                        </div>
                    </div>
                </div>
                <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        id="alert"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Center>{selectedServerName}</Center>
            </AlertDialogHeader>
            <AlertDialogBody>
            <Center><Avatar name={selectedServerName} src={selectedServerIcon} id="ServerIconPurchase"/><br/></Center><br/>
            <Center><a>MemberCount</a></Center>
            <Center><a>{selectedMemberCount} | <span id="greenText">{selectedOnlineCount}</span></a></Center><br/>
                <a>{selectedServerDescription}</a><br/><br/>
                <FormControl id="message" isRequired>
                    <FormLabel>Your advertisement</FormLabel>
                    <Textarea onChange={(e) => newSetAd(e)} defaultValue={message} placeholder="Your ad goes here..." maxLength="2000" size="sm"/>
                    <FormHelperText>Make sure to include "@everyone" in your message if you wish to ping the server! (Recomended for better results)</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <Stack spacing={1} direction="row">
                    <Checkbox colorScheme="blue"></Checkbox>
                        <FormLabel>Agree to our Terms of Service</FormLabel>
                    </Stack>
                    <FormHelperText>By clicking this button you are fully agreeing to our TOS which can be found here.</FormHelperText>
                </FormControl><br/>
                <Center><a>Total: ${selectedCost}.00</a></Center>
            </AlertDialogBody>
            <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>Cancel</Button><Link to={{  pathname: selectedInvite }} target="_blank"><Button ref={cancelRef} colorScheme="blue" ml={3} href={selectedInvite}>Join Server</Button></Link><Button colorScheme="green" ml={3} onClick={(e) => createOrderFunction()}>Purchase</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isOpen1}
        leastDestructiveRef={cancelRef1}
        onClose={onClose1}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Center>Open a Seller Account</Center>
            </AlertDialogHeader>

            <AlertDialogBody>
                <Alert status="info" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" variant="subtle" id="AlertMessage">
                    <AlertIcon /><AlertTitle mr={2}>Notice!</AlertTitle>
                    <AlertDescription>By clicking <span id="bold">"I Agree"</span> you are agreeing abide to our <span id="bold">Terms of Service</span> & <span id="bold">Community Guidlines!</span></AlertDescription>
                </Alert><br/>
              <Center>Opening a seller account gives you the ability to monetize your server by selling advertisements.</Center><br/>
                    <Center><a id="guidlinesText">Avertisement Guidlines</a></Center>
                    <Center><a id="disclosureDiscription">Failure to abide by these guidlines will result in a loss of funds .</a></Center><br/>
                <li>You must ping your server if the advertisement has a ping in it.</li>
                <li>The message must not be edited.</li>
                <li>The channel you post the message in must be near the top of you server.</li>
                <li>The channel must be visible to all users in your server.</li>
                <li>The channel must be strictly used for these advertisements</li>
                <li>Once the message is posted, it must remain up for a minimum of 7 days.</li><br/>
                <FormControl id="inviteLink" isRequired>
                    <FormLabel id="FormLabel">Contact Email</FormLabel>
                        <Input id="contactEmailInput" type="email" onChange={(e) => setContactEmail(e.target.value)} placeholder="Email"/>
                        <FormHelperText>We will contact you here with notifications regarding orders.</FormHelperText>
                </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose1}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={(e) => postSeller(e, contactEmail)} ml={3}>
                I Agree
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
        </div>
    )
}