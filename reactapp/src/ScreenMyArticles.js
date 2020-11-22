import React, {useState} from 'react';
import './App.css';
import { Card, Icon, Modal} from 'antd';
import Nav from './Nav'

import {connect} from 'react-redux'

const { Meta } = Card;

function ScreenMyArticles(props) {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [langFilter, setLangFilter] = useState(props.selectedLang)



  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)

  }

  var handleOk = e => {
    setVisible(false)
  }

  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  var noArticles;
  if(props.myArticles.length === 0){
    noArticles = <div style={{marginTop:"30px"}}>No Articles</div>
  }

  // console.log(props.myArticles);
  var myWishList;
  if (langFilter === 'en'){
    myWishList = props.myArticles.filter(e => e.lang === 'en');
  } else {
    myWishList = props.myArticles.filter(e => e.lang === 'fr');
  }

  return (
    <div>
         
            <Nav/>

            <div style={{display:'flex', justifyContent:'center', alignItems:'center'}} className="Banner">
              <img style={langFilter==='fr' ? {width:'40px', margin:'10px',cursor:'pointer', borderWidth:'2px', borderStyle:'solid', borderColor:'blue'} : {width:'40px', margin:'10px',cursor:'pointer'}} src='/images/fr.png' onClick={() => setLangFilter('fr')} alt="" />
              <img style={langFilter==='en' ? {width:'40px', margin:'10px',cursor:'pointer', borderWidth:'2px', borderStyle:'solid', borderColor:'blue'} : {width:'40px', margin:'10px',cursor:'pointer'}} src='/images/uk.png' onClick={() => setLangFilter('en')} alt="" /> 
            </div>

            {noArticles}

            <div className="Card">
    

            {myWishList.map((article,i) => (
                <div key={i} style={{display:'flex',justifyContent:'center'}}>

                  <Card
                    
                    style={{ 
                    width: 300, 
                    margin:'15px', 
                    display:'flex',
                    flexDirection: 'column',
                    justifyContent:'space-between' }}
                    cover={
                    <img
                        alt="example"
                        src={article.article.urlToImage}
                    />
                    }
                    actions={[
                        <Icon type="read" key="ellipsis2" onClick={() => showModal(article.article.title,article.article.content)} />,
                        <Icon type="delete" key="ellipsis" onClick={() => props.deleteToWishList(article.article.title)} />
                    ]}
                    >

                    <Meta
                      title={article.article.title}
                      description={article.article.description}
                    />

                  </Card>
                  <Modal
                    title={title}
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p>{content}</p>
                  </Modal>

                </div>

              ))}



       

                

             </div>
      
 

      </div>
  );
}

function mapStateToProps(state){
  return {myArticles: state.wishList, selectedLang: state.selectedLang}
}

function mapDispatchToProps(dispatch){
  return {
    deleteToWishList: function(articleTitle){
      dispatch({type: 'deleteArticle',
        title: articleTitle
      })
    }
  }
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenMyArticles);
