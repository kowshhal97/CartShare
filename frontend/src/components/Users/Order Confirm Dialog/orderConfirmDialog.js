import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {Redirect} from 'react-router';

import { ToastContainer, toast } from 'react-toastify';

import { red,green } from '@material-ui/core/colors';


import Grid from '@material-ui/core/Grid';
import Axios from 'axios';

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    diaglogWidth: {
        maxWidth: 10
    },
    dialogHeight:{
        minWidth:10
    }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);


class CustomizedDialogDemo extends React.Component {
     redirectVar=null
    state = {
        open: false,
        placeOrderConfirmOpen:false,
        pickOrder:false,
        cart:[]
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
        this.props.close();
    };
    placeOrder=()=>{
        if(!this.state.pickOrder && this.state.credit<=-4){
        this.setState({
            placeOrderConfirmOpen:true
        })
    }
    else{
        if(!this.state.pickOrder){
            this.confirmOrderWithoutSelf()
        }
        else{
            let obj={}
        let product=[]
        for(let i of this.state.cart){
            product.push({
                storeId:i.storeId,
                sku:i.sku,
                quantity:i.quantity
            })
        }
        obj.product=product;
        obj.pickedUpBy="self"
        Axios.post("http://35.155.66.64:8080/order/user/"+this.state.poolId+'/'+this.state.userId,obj).then(response=>{
            this.redirectVar=(<Redirect to={{
                pathname: "/cartshare/pickUp/",
                prevOrder:{id:response.data}
            }}
            
            />)

        this.handleClose()
        }).catch(err=>{
            toast.warn("Update your address or you might already have an order in progress", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
           
             //place order as self pickup and redirect to other orders.

            
        }
    
    }

    }

    componentDidMount=()=>{

    }

    confirmOrderWithoutSelf=()=>{

        let obj={}
        let product=[]
        for(let i of this.state.cart){
            product.push({
                storeId:i.storeId,
                sku:i.sku,
                quantity:i.quantity
            })
        }
        obj.product=product;
        obj.pickedUpBy="not self"
        Axios.post("http://35.155.66.64:8080/order/user/"+this.state.poolId+'/'+this.state.userId,obj).then(response=>{
        this.handleClose()
        window.location.replace('/cartshare/orders')
        }).catch(err=>{
            toast.warn("Update your address or you might already have an order in progress", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        });

    }
    handleClickOpenConfirm=()=>{
        this.setState({placeOrderConfirmOpen:true})
    }

    handleCloseConfirm=()=>{

this.setState({placeOrderConfirmOpen:false})
    }

    pickOrder=()=>{
this.setState({pickOrder:!this.state.pickOrder})
    }

    addQuantity=(product)=>{
        let updated=[]
        for(let i of this.state.cart){
            if(i.storeId===product.storeId&&i.sku===product.sku){
                i.quantity++;
            }
            updated.push(i)
        }
        this.setState({cart:updated})
    }
    
    subQuantity=(product)=>{
        
        let updated=[]
        for(let i of this.state.cart){
            
            if(i.storeId===product.storeId&&i.sku===product.sku){
                if(i.quantity===0)
                    continue;
                i.quantity--;
            }
            updated.push(i)
        }
        this.setState({cart:updated})
    }

    componentDidMount=()=>{
        this.redirectVar=null;
        this.setState({

            cart:JSON.parse(JSON.stringify(this.props.cart)),
            poolId:sessionStorage.getItem('poolid'),
            userId:sessionStorage.getItem('id'),
            credits:sessionStorage.getItem('credits'),
            contributionStatus:sessionStorage.getItem('contributionStatus')
        })
    }

    checkTotal=(total)=>{

    }
    render() {

        console.log(this.props.cart)
        if (this.props.display === true && this.state.open === false) {
            this.setState({
                open: true,
            });

        }

        let total=0;
        let tax=0;
        let convinienceFee=0;
        let cart = []
        let count=0;
        for (let i of this.state.cart) {
            total=total+(parseFloat(i.price)*parseFloat(i.quantity))
            cart.push(
                <li>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="flex-start"
                    >
                        <Grid item xs>
                            product name: {i.name}
                        </Grid>
                        <Grid item xs>
                            Price of each Item: {i.price}
                        </Grid>
                        <Grid
                            container
                            item xs
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                            >
                                <Grid item xs={2}><RemoveIcon style={{ color: red[500] }} onClick={()=>this.subQuantity(i)}/></Grid>
                            <Grid item xs={4}>quantity:{i.quantity}</Grid>
                            <Grid item xs={6}><AddIcon style={{ color: green[500] }} onClick={()=>this.addQuantity(i)}/></Grid>
                            
                        </Grid >
                    </Grid>
                </li>
            )
            count++;
            if(count===this.state.cart.length&&total===0){
                    this.handleClose()
            }
        }
        tax=total*(9.5)/100;
        convinienceFee=total*(0.5)/100;
        let grandTotal=total+tax+convinienceFee;
        return (
            <div>
{this.redirectVar}
                <Dialog
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={this.state.open}
                    fullWidth={true}
                    maxWidth={"md"}
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose} style={{fontSize:15}}>
                       Checkout
                    </DialogTitle>
                    <DialogContent>


                        {/* display orders */}

{this.state.placeOrderConfirmOpen?(<Dialog
                onClose={this.handleClose}
                open={this.state.open}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description">
              <DialogTitle id="alert-dialog-slide-title">
                  Confirm Order
              </DialogTitle>
              <DialogContent>
                
                  Your Contribution seems to be Low, Please confirm to place the order!
                
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleCloseConfirm} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.confirmOrderWithoutSelf} type="submit" variant="outlined" color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>):null}
                        <ol>
                            {cart}

                        </ol>
                        
                        <div style={{float:'right'}}>
                        <br/><br/><br/><br/>
                        <Grid
  container
  direction="column"
  justify="flex-start"
  alignItems="center">
                        <Grid container item xs={12}>
                        <b>
                            Purchased: {Math.round(total * 100) / 100}$
                        </b>
                        </Grid>

                        <Grid container item xs={12}>
                        <b>
                             Tax(9.5%): {Math.round(tax * 100) / 100}$
                        </b>
                        </Grid>
                        <Grid container item xs={12}>
                        <b>
                             Fee(0.5%): {Math.round(convinienceFee * 100) / 100}$
                        </b>
                        </Grid>
                        <Grid item xs={12}>
                            <hr style={{borderColor:"black"}}/>
                            <b>
                                Total: {Math.round(grandTotal * 100) / 100}$
                            </b>
                            <hr style={{borderColor:"black"}} />
                        </Grid>

                        </Grid>
                        </div>
                        <div class="form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1" onChange={this.pickOrder}/>
    <label class="form-check-label" for="exampleCheck1"><span style={{color:"blue"}}>Pick your own order</span></label>
  </div>
                    </DialogContent>
                    <DialogActions>
                    <ToastContainer />
                        <Button onClick={this.placeOrder} type="submit" variant="outlined" color="primary">
                            Place Order
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CustomizedDialogDemo;