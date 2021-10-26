import React from 'react';
import { getUserDetails, postBecomeSeller, getUserOrders } from '../../utils/api'
import '../History/History.css'
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';
import {Menu, Code, Th, Alert, AlertIcon, AlertDescription, AlertTitle, FormControl, FormLabel, Input, FormHelperText, Tbody, Tooltip, Tr, Td, Table, TableCaption, Thead, Tfoot, Center, Divider, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuIcon, MenuCommand, MenuDivider, Button, Avatar, AvatarBadge, AvatarGroup, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,DrawerCloseButton, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay,} from "@chakra-ui/react"
import { render } from 'react-dom';
export function History({
    history, sert
} ) {

    const [user, setUser] = React.useState(null);
    const [userImage, setUserImage] = React.useState(null);
    const [seller, setSeller] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [loading2, setLoading2] = React.useState(true);
    const [isOpen, setIsOpen] = React.useState(false)
    const [isOpen1, setIsOpen1] = React.useState(false)

    const [orderMessage, setOrderMessage] = React.useState(null)
    const [orderId, setOrderId] = React.useState(null)
    const [orderServer, setOrderServer] = React.useState(null)

    const [contactEmail, setContactEmail] = React.useState(null);

    //Table
    const [page, setPage] = React.useState(0);
    const [orders, setOrders] = React.useState(null);

    const newPageSelection = (newValue) => {
        try {
            if(newValue < 0) {
                newValue = 0
            }
            setPage(newValue)
            getUserOrders(newValue)
            .then(({data}) => {
                console.log(data)
                setOrders(data);
            }).catch((err) => {
                console.log(err)
            })
        } catch (error) {
            setPage(0);
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

    const onClose = () => setIsOpen(false)
    const onClose1 = () => setIsOpen1(false)

    const setViewedOrder = (item) => {
        setOrderMessage(item.message)
        setOrderId(item.paymentId)
        setOrderServer(item.name)
        setIsOpen1(true)
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

    const sellerClick = () => history.push('/seller');
    const dashboardClick = () => history.push('/dashboard');
    const browseClick = () => history.push('/browse');
    const historyClick = () => history.push('/history');
    const settingsClick = () => history.push('/settings');

    const cancelRef = React.useRef()
    const cancelRef1 = React.useRef()

    React.useEffect( () => {
        getUserDetails()
        .then(({data}) => {
            console.log(data);
            setUser(data);
            setUserImage(('https://cdn.discordapp.com/avatars/' + data.discordId + '/' + data.avatar + '.png'));
            console.log(userImage)
            if(data.seller == true) {
                setSeller(true)
            }
            setLoading(false);
        getUserOrders(page)
            .then(({data}) => {
                console.log(data)
                setOrders(data);
                setLoading2(false);
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
            history.push('/');
            setLoading(false);
        })
    }, [])

    return !loading && !loading2 &&(
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
                        <h1 id="pageHeading">Order History</h1>
                        <a id="pageDescription">Here you can see all the previous orders you have placed.</a>
                        <div id="serversContainer" className="previousOrders">
                        <Table id="Table"  variant="striped" colorScheme="darkgray" size="sm" >    
                            <TableCaption>
                                <Button id="pageButton" onClick={() => newPageSelection((page-1))}>❮</Button>
                                <Button id="pageButton">{page}</Button>
                                <Button id="pageButton" onClick={() => newPageSelection((page+1))}>❯</Button>
                            </TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Server</Th>
                                    <Th>ID</Th>
                                    <Th>Status</Th>
                                    <Th>Time</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody id="threadBody">
                                {orders.map(item => {
                                    if(item.refunded == true) {
                                        return <Tooltip label={item.name} aria-label="A tooltip">
                                        <Tr>
                                            <Td><Avatar name={item.name} src={item.icon}/></Td>
                                            <Td>{item.paymentId}</Td>
                                            <Td><span id="refunded">Refunded</span></Td>
                                            <Td>{timeSince(item.created)} ago</Td>
                                            <Td><Center>X</Center></Td>
                                        </Tr>
                                        </Tooltip> 
                                    }
                                    if(item.rejected == true) {
                                        return <Tooltip label={item.name} aria-label="A tooltip">
                                        <Tr>
                                            <Td><Avatar name={item.name} src={item.icon}/></Td>
                                            <Td>{item.paymentId}</Td>
                                            <Td><span id="rejected">Rejected</span></Td>
                                            <Td>{timeSince(item.created)} ago</Td>
                                            <Td><Center>X</Center></Td>
                                        </Tr>
                                        </Tooltip> 
                                    }
                                    if(item.disputed == true) {
                                        return <Tooltip label={item.name} aria-label="A tooltip">
                                        <Tr>
                                            <Td><Avatar name={item.name} src={item.icon}/></Td>
                                            <Td>{item.paymentId}</Td>
                                            <Td><span id="rejected">Disputed</span></Td>
                                            <Td>{timeSince(item.created)} ago</Td>
                                            <Td><Center>X</Center></Td>
                                        </Tr>
                                        </Tooltip> 
                                    }
                                    if(item.reviewed == true) {
                                        return <Tooltip label={item.name} aria-label="A tooltip">
                                            <Tr>
                                                <Td><Avatar name={item.name} src={item.icon}/></Td>
                                                <Td>{item.paymentId}</Td>
                                                <Td><span id="onlineCount">Completed</span></Td>
                                                <Td>{timeSince(item.created)} ago</Td>
                                                <Td><Center><Button id="reportButton" colorScheme="red" >⚐</Button></Center></Td>
                                            </Tr>
                                            </Tooltip>
                                    } else {
                                        return <Tooltip label={item.name} aria-label="A tooltip">
                                            <Tr>
                                                <Td><Avatar name={item.name} src={item.icon}/></Td>
                                                <Td>{item.paymentId}</Td>
                                                <Td><span id="inProgress">In progress</span></Td>
                                                <Td>{timeSince(item.created)} ago</Td>
                                                <Td><Center>X</Center></Td>
                                            </Tr>
                                            </Tooltip>
                                    }
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
              <Button ref={cancelRef} onClick={onClose}>
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