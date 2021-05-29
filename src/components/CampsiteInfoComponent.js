import React, { Component }  from 'react';
import { Card, CardImg, CardBody, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Label} from 'react-redux-form';
import { Link } from 'react-router-dom';


    function RenderCampsite({campsite}) {
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            );

    }

    function RenderComments({comments}){
        if(comments){
            return(
                <div className="col-md-5 md-1">
                    <h4>Comments</h4>
                    {comments.map(comment=>{
                        return <div>
                           <div className="row">{comment.text}</div>
                           <div>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</div>
                           <p></p>
                        </div>                       
                    })}
                    <CommentForm/> 
                </div>
            );
        } else{
            return <div></div>
        }
    }

    function CampsiteInfo(props) {

        if (props.campsite){
            return(
                <div className = "container">
                    <div className="row">
                        <div className="col">
                        <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments = {props.comments} />  
                                           
                        
                        
                        
                    </div>
                </div>               
            );
        } else{
                return(
                    <div></div>
                );
            }

        }
        class CommentForm extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    rating:'',
                    author: '',
                    text: '',
                isModalOpen: false
                };
                this.toggleModal = this.toggleModal.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);                
            }
            toggleModal() {
                this.setState({
                    isModalOpen: !this.state.isModalOpen
                });
            }
            handleSubmit(values) {
                console.log("Current state is: " + JSON.stringify(values));
                alert("Current state is: " + JSON.stringify(values));
            }
            render() {
                return(
                    <React.Fragment>                 
                        <Button outline onClick={this.toggleModal} className="btn">
                            <i className="fa fa-pencil fa-lg" /> Submit Comment
                        </Button>                
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                    <div className="form-group">                             
                                        <Label htmlFor="rating">Rating</Label>                                      
                                        <Control.select model=".rating" id="rating" name="rating">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Control.select> 
                                    </div> 
                                    <div className="form-group">                             
                                        <Label htmlFor="author">Author</Label>                                      
                                        <Control.text model=".author" id="author" name="author"/> 
                                    </div>
                                    <div className="form-group">                             
                                        <Label htmlFor="text">Text</Label>                                      
                                        <Control.textarea model=".text" id="text" name="text"/> 
                                    </div>                               
                                    <Button type="submit" color="primary">Submit</Button>   
                                </LocalForm>
                            </ModalBody>
                        </Modal>
                    </React.Fragment>
                 );
            }
        }
    


export default CampsiteInfo;