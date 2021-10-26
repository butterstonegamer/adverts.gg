import React from 'react';
import { getUserDetails, completeOrder, postAddServer, getServers, getOrders, postEditServer, rejectOrder } from '../../utils/api'
import '../Seller/Seller.css'
import { Link } from 'react-router-dom';
import {Menu, Code, ChevronDownIcon, Stat, StatLabel, StatNumber, StatHelpText, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Input, Textarea, InputGroup, InputLeftAddon, Slider, SliderTrack, Box, SliderFilledTrack, SliderThumb, Select, Stack, Checkbox, Divider, Center, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider, Button, Avatar, AvatarBadge, AvatarGroup, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,DrawerCloseButton, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, FormControl,FormLabel,FormErrorMessage,FormHelperText,} from "@chakra-ui/react"

export function Seller({
    history,
} ) {


    const [user, setUser] = React.useState(null);
    const [servers, setServers] = React.useState(null);
    const [orders, setOrders] = React.useState(null);
    const [userImage, setUserImage] = React.useState(null);
    const [seller, setSeller] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [loading1, setLoading1] = React.useState(true);
    const [loading2, setLoading2] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpen1, setIsOpen1] = React.useState(false);
    const [isOpen2, setIsOpen2] = React.useState(false);
    const [isOpen3, setIsOpen3] = React.useState(false);

    const [selectedServerId, setSelectedServerId] = React.useState(null);
    const [selectedServerName, setSelectedServerName] = React.useState(null);
    const [selectedCatagory, setSelectedCatagory] = React.useState(null);
    const [selectedIcon, setSelectedIcon] = React.useState(null);
    const [pingCost, setPingCost] = React.useState(2);
    const [noPingCost, setNoPingCost] = React.useState(2);
    const [everyoneEnabled, setEveryoneEnabled] = React.useState(true);
    const [description, setDescription] = React.useState(null);
    const [invite, setInvite] = React.useState(null);
    const [denied, setDenied] = React.useState(null);
    const [deniedReason, setDeniedReason] = React.useState(null);


    const [viewedOrderName, setviewedOrderName] = React.useState(null);
    const [viewedOrderIcon, setviewedOrderIcon] = React.useState(null);
    const [viewedOrderMessage, setviewedOrderMessage] = React.useState(null);
    const [viewedOrderId, setviewedOrderId] = React.useState(null);

    const [rejectReason, setRejectReason] = React.useState(null);

    const reject = (reason) => {
        setRejectReason(reason)
        setIsOpen3(true)
    }

    const confirmReject = () => {
        rejectOrder(viewedOrderId, rejectReason)
        setTimeout(function(){ 
            window.location.reload(false)
        }, 1000);
    }

    const confirmComplete = () => {
        completeOrder(viewedOrderId)
        setTimeout(function(){ 
            window.location.reload(false)
        }, 1000);
    }

    const onClose = () => setIsOpen(false)
    const onClose1 = () => setIsOpen1(false)
    const onClose2 = () => setIsOpen2(false)
    const onClose3 = () => setIsOpen3(false)

    const viewOrder = (order) => {
        setviewedOrderIcon(order.icon)
        setviewedOrderMessage(order.message)
        console.log(order.message)
        setviewedOrderName(order.name)
        setviewedOrderId(order.paymentId)
        setIsOpen1(true)
    }

    const editServer = (server) => {
        setSelectedServerId(server.id)
        setSelectedServerName(server.name)
        setSelectedCatagory(server.catagory)
        setSelectedIcon(server.icon)
        setPingCost(server.cost)
        setNoPingCost(server.cost)
        setEveryoneEnabled(server.everyoneEnabled)
        setDescription(server.description)
        setInvite(server.invite)
        setIsOpen2(true)
        setDenied(server.denied)
        setDeniedReason(server.deniedReason)
    }

    var timeSince = function(date) {
        if (typeof date !== 'object') {
          date = new Date(date);
        }
      
        var seconds = Math.floor((new Date() - date) / 1000);
        var intervalType;
      
        var interval = Math.floor(seconds / 31536000);
        if (interval >= 1) {
          intervalType = 'year';
        } else {
          interval = Math.floor(seconds / 2592000);
          if (interval >= 1) {
            intervalType = 'month';
          } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
              intervalType = 'day';
            } else {
              interval = Math.floor(seconds / 3600);
              if (interval >= 1) {
                intervalType = "hour";
              } else {
                interval = Math.floor(seconds / 60);
                if (interval >= 1) {
                  intervalType = "minute";
                } else {
                  interval = seconds;
                  intervalType = "second";
                }
              }
            }
          }
        }
      
        if (interval > 1 || interval === 0) {
          intervalType += 's';
        }
      
        return interval + ' ' + intervalType;
      };

    const clickedPostAddServer = () => {
        if(!selectedServerId){
            document.getElementById('SelectServer').style.border = "solid 2px red";
        }
        if(!selectedCatagory){
            document.getElementById('SelectCatagor').style.border = "solid 2px red";
        }
        if(!invite){
            document.getElementById('invite').style.border = "solid 2px red";
        }
        if(!description){
            document.getElementById('description').style.border = "solid 2px red";
        }

        if(selectedServerId && selectedCatagory && invite && description){
            postAddServer(selectedServerId, selectedServerName, selectedCatagory, pingCost, noPingCost, everyoneEnabled, description, user.discordId, user.email, selectedIcon, invite)
            setTimeout(function(){ 
                window.location.reload(false)
            }, 1000);
        }
    }

    const clickedPostEditServer = () => {
        if(!selectedServerId){
            document.getElementById('SelectServer').style.border = "solid 2px red";
        }
        if(!selectedCatagory){
            document.getElementById('SelectCatagor').style.border = "solid 2px red";
        }
        if(!invite){
            document.getElementById('invite').style.border = "solid 2px red";
        }
        if(!description){
            document.getElementById('description').style.border = "solid 2px red";
        }

        if(selectedServerId && selectedCatagory && invite && description){
            postEditServer(selectedServerId, selectedServerName, selectedCatagory, pingCost, noPingCost, everyoneEnabled, description, user.discordId, user.email, selectedIcon, invite)
            setTimeout(function(){ 
                window.location.reload(false)
            }, 1000);
        }
    }

    const newSelectedServer = () => {
        document.getElementById('SelectServer').style.border = "solid 1px gray";
        var selectBox = document.getElementById("SelectServer");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        setSelectedServerName(selectedValue);
        user.guilds.forEach(function (item, index) {
            if(item.name == selectedValue) {
                setSelectedServerId(item.id);
                setSelectedIcon(item.icon)
            } else {
                return
            }
        });
    }

    const newSelectedCatagory = () => {
        var selectBox = document.getElementById("SelectCatagor");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;
        setSelectedCatagory(selectedValue);
    }

    let newSetInvite = (e) => {
        let inputValue = e.target.value
        setInvite(inputValue)
    }

    let newSetDescription = (e) => {
        let inputValue = e.target.value
        setDescription(inputValue)
    }

    const sellerClick = () => history.push('/seller');
    const dashboardClick = () => history.push('/dashboard');
    const browseClick = () => history.push('/browse');
    const historyClick = () => history.push('/history');
    const settingsClick = () => history.push('/settings');

    const cancelRef = React.useRef()
    const cancelRef1 = React.useRef()
    const cancelRef2 = React.useRef()
    const cancelRef3 = React.useRef()


    React.useEffect( () => {
        getServers()
        .then(({data}) => {
            setServers(data);
            setLoading(false);
        }).catch((err) => {
            console.log(err)
        })
        getOrders()
        .then(({data}) => {
            console.log(data)
            setOrders(data);
            setLoading2(false);
        }).catch((err) => {
            console.log(err)
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

    return !loading && !loading1 && !loading2 &&(
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
                    : <Button id="sideBarButton" colorScheme="blue" onClick={() => setIsOpen(true)}>Become A Seller</Button>
                }
                <br/><Button id="sideBarButton" colorScheme="blue" onClick={browseClick}>Browse Ads</Button><br/>
                <Button id="sideBarButton" colorScheme="blue" onClick={historyClick}>Order History</Button><br/>
                <Button id="sideBarButton" colorScheme="blue" onClick={settingsClick}>Settings</Button>
                </div>
            </div>
            <div id="ContentArea">
                    <div id="WelcomeMenu">
                        <h1 id="welcome">Welcome Back <span>{user.username}</span></h1>
                    </div>
                    <div id="StatsMenu">
                        <div id="StatBox">
                            <div id="StatNumberbox">
                                <Stat>
                                    <StatLabel id="StatLabel">Total Sales</StatLabel>
                                    <StatNumber id="StatNumber">{user.salesTotal}</StatNumber>
                                    <StatHelpText id="StatLabel">All Time</StatHelpText>
                                </Stat>
                            </div>
                        </div>
                        <div id="StatBox">
                            <div id="StatNumberbox">
                                <Stat>
                                    <StatLabel id="StatLabel">Total Earnings</StatLabel>
                                    <StatNumber id="StatNumber">${user.TotalEarned.toFixed(2)}</StatNumber>
                                    <StatHelpText id="StatLabel">All Time</StatHelpText>
                                </Stat>
                            </div>
                        </div>
                        <div id="StatBox">
                            <div id="StatNumberbox">
                                <Stat>
                                    <StatLabel id="StatLabel">Pending Earnings</StatLabel>
                                    <StatNumber id="StatNumber">${user.pendingBalance.toFixed(2)}</StatNumber>
                                    <StatHelpText id="StatLabel">Currently Pending</StatHelpText>
                                </Stat>
                            </div>
                        </div>
                        <div id="StatBox">
                            <div id="StatNumberbox">
                                <Stat>
                                    <StatLabel id="StatLabel">Account Balance</StatLabel>
                                    <StatNumber id="StatNumber">${user.balance.toFixed(2)}</StatNumber>
                                    <StatHelpText id="StatLabel">Available funds</StatHelpText>
                                </Stat>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div id="container">
                        <div id="orders">
                            <a id="listedServersCaption">Outstandings Orders</a>
                            <Divider />
                            {orders.map(item => {
                                if(item.delivered == false && item.rejected == false) {
                                    return <div id="listedServerBlock">
                                            <Avatar id="listedServerIcon" name={item.name} src={item.icon} />
                                            <a id="orderServerName">{item.name}<br/><span id="orderTime">placed: {timeSince(item.created)} ago</span></a>
                                            <Button id="viewOrderButton" onClick={(e) => viewOrder(item)}>View Order</Button>
                                            <a id="orderCost">${item.subtotal}.00</a>
                                        </div>
                                } 
		                    })};
                            {orders.length <= 0
                            ? <a id="outstandingOrdersText">You currently have no outstanding orders to complete...</a>
                            : <a id="outstandingOrdersText">Please complete the orders above in a timely matter.<br/>After 3 days orders will automaticaly be refunded!</a>
                            }
                        </div>
                        <div id="listedServers">
                            <a id="listedServersCaption">Listed Servers</a>
                            <Divider />
                            {servers.map(item => {
                                if(item.review == true) {
                                    return <div id="listedServerBlock">
                                            <Avatar id="listedServerIcon" name={item.name} src={item.icon} />
                                            <a id="listedServerName">{item.name}</a>
                                            <a id="PendingApproval">Pending Approval</a>
                                        </div>
                                } else {
                                    if((item.denied == true)){
                                        return <div id="listedServerBlock">
                                            <Avatar id="listedServerIcon" name={item.name} src={item.icon} />
                                            <a id="listedServerName">{item.name}</a>
                                            <Button id="editButton" onClick={(e) => editServer(item)} >Edit</Button><a id="denied">Denied </a>
                                        </div>
                                    } else {
                                        return <div id="listedServerBlock">
                                            <Avatar id="listedServerIcon" name={item.name} src={item.icon} />
                                            <a id="listedServerName">{item.name}</a>
                                            <Button id="editButton" onClick={(e) => editServer(item)} >Edit</Button><a id="active">Active</a>
                                        </div>
                                    }
                                }
		                    })};
                            
                            <Button id="AddServerButton"colorScheme="blue" onClick={() => setIsOpen(true)}>Add Server</Button>
                        </div>
                        </div>
                    </div>
                </div>
                <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Center>Add A Server</Center>
            </AlertDialogHeader>

            <AlertDialogBody>
            <Alert status="info" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" variant="subtle" id="AlertMessage">
                <AlertIcon /><AlertTitle mr={2}>Notice!</AlertTitle>
                    <AlertDescription>By participating in the marketplace you must abide by our <span id="bold">Terms of Service</span> & <span id="bold">Community Guidlines!</span></AlertDescription>
                  </Alert>
                  <br/>
                <FormControl id="adType">
                    <FormLabel id="FormLabel" >Accepted Ad Types</FormLabel>
                    <Stack spacing={10} direction="row">
                        <Checkbox colorScheme="blue" defaultIsChecked isDisabled>
                            No Ping
                        </Checkbox>
                        <Checkbox colorScheme="green" defaultIsChecked onChange={(e) => setEveryoneEnabled(e.target.checked)}>
                            @everyone
                        </Checkbox>
                    </Stack>
                    <FormHelperText>By accepting @everyone pings you will get more orders!</FormHelperText>
                </FormControl>
                <FormControl id="selectedServer" isRequired>
                    <FormLabel id="FormLabel">Selected Server</FormLabel>
                    <Select id="SelectServer" placeholder="Select A Server" onChange={() => newSelectedServer()}>
		            {user.guilds.map(item => {
                        if(item.owner == true) {
                            return (<option>{item.name}</option>);
                        } else {
                            return
                        }
		            })};
                    </Select>
                </FormControl>
                <FormControl id="serverCatagory" isRequired>
                    <FormLabel id="FormLabel">Server Catagory</FormLabel>
                    <Select id="SelectCatagor" placeholder="Select A Catagory" onChange={() => newSelectedCatagory()}>
                        <option>Community</option>
                        <option>Gaming</option>
                        <option>Anime</option>
                        <option>Meme</option>
                        <option>Business</option>
                        <option>Crypto</option>
                        <option>Giveaway</option>
                        <option>Social</option>
                        <option>Music</option>
                        <option>Roleplay</option>
                        <option>NSFW</option>
                    </Select>
                </FormControl><br/>
                {everyoneEnabled
                    ? <FormControl id="pingCost" isRequired>
                    <FormLabel id="FormLabel">Cost for a @everyone ad: ${pingCost}.00</FormLabel>
                    <Slider defaultValue={2} min={2} max={100} step={1} onChange={(val) => setPingCost(val)}>
                        <SliderTrack bg="red.100">
                            <Box position="relative" right={10} />
                        <SliderFilledTrack bg="tomato" />
                        </SliderTrack>
                            <SliderThumb boxSize={6} />
                    </Slider>
                    <FormHelperText>The minimum price is $2.00 because of the marketplace fee.</FormHelperText>
                </FormControl>
                    : <FormControl id="noPingCost" isRequired>
                    <FormLabel id="FormLabel">Cost for a No Ping ad: ${noPingCost}.00</FormLabel>
                    <Slider defaultValue={2} min={2} max={100} step={1} onChangeEnd={(val) => setNoPingCost(val)}>
                        <SliderTrack bg="red.100">
                            <Box position="relative" right={10} />
                        <SliderFilledTrack bg="tomato" />
                        </SliderTrack>
                            <SliderThumb boxSize={6} />
                    </Slider>
                    <FormHelperText>The minimum price is $2.00 because of the marketplace fee.</FormHelperText>
                </FormControl>
                }
                <FormControl id="inviteLink" isRequired>
                    <FormLabel id="FormLabel">Invite link to your server.</FormLabel>
                    <InputGroup size="sm">
                        <InputLeftAddon children="https://discord.com/" />
                        <Input id="invite" placeholder="Sk5v6cDn" onChange={(e) => newSetInvite(e)}/>
                    </InputGroup>
                    <FormHelperText>It is very important this link is for the server you selected!  The invite link must also have unlimited uses and never expire!</FormHelperText>
                </FormControl>
                <FormControl id="inviteLink" isRequired>
                    <FormLabel id="FormLabel">Brief server description.</FormLabel>
                    <Textarea id="description" onChange={(e) => newSetDescription(e)} placeholder="Server Description"  maxLength="200" size="sm"/>
                </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={clickedPostAddServer} ml={3}>
                Add Server
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isOpen2}
        leastDestructiveRef={cancelRef2}
        onClose={onClose2}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Center>Edit {selectedServerName}</Center>
              
            </AlertDialogHeader>
            <AlertDialogBody>
            {denied == true
                    ? <Alert status="error">
                    <AlertIcon />
                    <AlertTitle mr={2}>Reason For Denial</AlertTitle>
                    <AlertDescription>{deniedReason}</AlertDescription>
                  </Alert>
                    : <div/>
                }<br/><br/>
                <FormControl id="adType">
                    <FormLabel>Accepted Ad Types</FormLabel>
                    <Stack spacing={10} direction="row">
                        <Checkbox colorScheme="blue" defaultIsChecked isDisabled>
                            No Ping
                        </Checkbox>
                        <Checkbox colorScheme="green" onChange={(e) => setEveryoneEnabled(e.target.checked)}>
                            @everyone
                        </Checkbox>
                    </Stack>
                    <FormHelperText>By accepting @everyone pings you will get more orders!</FormHelperText>
                </FormControl>
                <FormControl id="serverCatagory" isRequired>
                    <FormLabel>Server Catagory</FormLabel>
                    <Select id="SelectCatagor" placeholder="Select A Catagory" defaultValue={selectedCatagory} onChange={() => newSelectedCatagory()}>
                        <option>Community</option>
                        <option>Gaming</option>
                        <option>Anime</option>
                        <option>Meme</option>
                        <option>Business</option>
                        <option>Crypto</option>
                        <option>Giveaway</option>
                        <option>Social</option>
                        <option>Music</option>
                        <option>Roleplay</option>
                        <option>NSFW</option>
                    </Select>
                </FormControl><br/>
                {everyoneEnabled
                    ? <FormControl id="pingCost" isRequired>
                    <FormLabel>Cost for a @everyone ad: ${pingCost}.00</FormLabel>
                    <Slider defaultValue={2} min={2} max={100} step={1} defaultValue={pingCost} onChange={(val) => setPingCost(val)}>
                        <SliderTrack bg="red.100">
                            <Box position="relative" right={10} />
                        <SliderFilledTrack bg="tomato" />
                        </SliderTrack>
                            <SliderThumb boxSize={6} />
                    </Slider>
                    <FormHelperText>The minimum price is $2.00 because of the marketplace fee.</FormHelperText>
                </FormControl>
                    : <FormControl id="noPingCost" isRequired>
                    <FormLabel>Cost for a No Ping ad: ${noPingCost}.00</FormLabel>
                    <Slider defaultValue={2} min={2} max={100} step={1} onChangeEnd={(val) => setNoPingCost(val)}>
                        <SliderTrack bg="red.100">
                            <Box position="relative" right={10} />
                        <SliderFilledTrack bg="tomato" />
                        </SliderTrack>
                            <SliderThumb boxSize={6} />
                    </Slider>
                    <FormHelperText>The minimum price is $2.00 because of the marketplace fee.</FormHelperText>
                </FormControl>
                }
                <FormControl id="inviteLink" isRequired>
                    <FormLabel>Invite link to your server.</FormLabel>
                    <InputGroup size="sm">
                        <InputLeftAddon children="https://discord.com/" />
                        <Input id="invite" placeholder="Sk5v6cDn" defaultValue={invite} onChange={(e) => newSetInvite(e)}/>
                    </InputGroup>
                    <FormHelperText>It is very important this link is for the server you selected!  The invite link must also have unlimited uses and never expire!</FormHelperText>
                </FormControl>
                <FormControl id="inviteLink" isRequired>
                    <FormLabel>Brief server description.</FormLabel>
                    <Textarea id="description" defaultValue={description} onChange={(e) => newSetDescription(e)} placeholder="Server Description"  maxLength="200" size="sm"/>
                    <FormHelperText>By resubmitting your server it will have to go back under review!</FormHelperText>
                </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
                <Button ref={cancelRef2} onClick={onClose2}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={clickedPostEditServer} ml={3}>
                Submit for review
              </Button>
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
              <Center><Avatar src={viewedOrderIcon} /></Center>
              <Center>{viewedOrderName}</Center>
            </AlertDialogHeader>
            <AlertDialogBody>
                <Divider />
                <Center><h1 id="orderId">{viewedOrderId}</h1></Center><br/>
                <Alert status="info" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" variant="subtle" id="AlertMessage">
                <AlertIcon /><AlertTitle mr={2}>Guidlines Notice!</AlertTitle>
                    <AlertDescription>When posting this advertisement, make sure to follow our <span id="bold">Marketplace Guidlines.</span> Failure to do so could result in the buyer getting a full refund & a loss of funds.</AlertDescription>
                  </Alert><br/>
                <Center><a id="orderHeader">Order Advertisement Message</a></Center>
                <Divider/>
                <br/>
                <Center><Code dangerouslySetInnerHTML={{ __html: viewedOrderMessage }} id="viewOrderMessage" /></Center>
            </AlertDialogBody>
            <AlertDialogFooter>
            <Button ref={cancelRef1} onClick={onClose1}>
                Cancel
              </Button>
                <Menu>
                    <MenuButton ml={3} id="rejectOrder" colorScheme="red" as={Button} >
                        Reject Order ✗
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={(e) => reject("Inappropriate Advertisement")}>Inappropriate Advertisement ➥</MenuItem>
                        <Divider/>
                        <MenuItem onClick={(e) => reject("Malicous Advertisement")}>Malicous Advertisement ➥</MenuItem>
                        <Divider/>
                        <MenuItem onClick={(e) => reject("Unable to complete order")}>Unable to complete order ➥</MenuItem>
                        <Divider/>
                    </MenuList>
                </Menu>
              <Button colorScheme="green" ml={3} onClick={(e) => confirmComplete()}>
                Mark as Complete ➥
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isOpen3}
        leastDestructiveRef={cancelRef3}
        onClose={onClose3}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Center>Reject Order</Center>
            </AlertDialogHeader>
            <AlertDialogBody>
                Are you sure you want to reject this order with the selected reason of: <span>"{rejectReason}"</span>
            </AlertDialogBody>
            <AlertDialogFooter>
            <Button ref={cancelRef3} onClick={onClose3}>
                Cancel
              </Button>
              <Button onClick={(e) => confirmReject()} colorScheme="green" ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
        </div>
    )
}