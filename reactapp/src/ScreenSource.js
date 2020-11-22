import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import { connect } from 'react-redux';

function ScreenSource(props) {

  const [sourceList, setSourceList] = useState([])
  const [selectedLang, setSelectedLang] = useState(props.selectedLang)


  useEffect(() => {
    const APIResultsLoading = async() => {
      var langue = 'fr'
      var country = 'fr'
        
      if(selectedLang === 'en'){
        langue = 'en'
        country = 'us'
      }
      props.changeLang(selectedLang)
      const data = await fetch(`https://newsapi.org/v2/sources?language=${langue}&country=${country}&apiKey=d0c88d9b3d894b5c8d3cfc42054ba0ef`)
      const body = await data.json()
      setSourceList(body.sources)
    }

    const getUserLang = async () => {
      const data = await fetch(`/user-lang/${props.token}`);
      const body = await data.json();
      var lang = "";
      if (body.result === true) {
        lang = body.lang;
        setSelectedLang(lang);
      };
    }

    APIResultsLoading();
    getUserLang();
  }, [selectedLang])

  const updateUserLang = async (language) => {
    // console.log(props.token);
    // console.log(selectedLang)
    await fetch(`/update-lang`,
    {
      method: 'PUT',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `token=${props.token}&language=${language}`
    })
  }
  

  return (
    <div>
        <Nav/>
       
       <div style={{display:'flex', justifyContent:'center', alignItems:'center'}} className="Banner">
          <img style={selectedLang==='fr' ? {width:'40px', margin:'10px',cursor:'pointer', borderWidth:'2px', borderStyle:'solid', borderColor:'blue'} : {width:'40px', margin:'10px',cursor:'pointer'}} src='/images/fr.png' onClick={() => {setSelectedLang('fr');updateUserLang('fr')}} alt="" />
          <img style={selectedLang==='en' ? {width:'40px', margin:'10px',cursor:'pointer', borderWidth:'2px', borderStyle:'solid', borderColor:'blue'} : {width:'40px', margin:'10px',cursor:'pointer'}} src='/images/uk.png' onClick={() => {setSelectedLang('en'); updateUserLang('en')}} alt="" /> 
        </div>

       <div className="HomeThemes">
          
              <List
                  itemLayout="horizontal"
                  dataSource={sourceList}
                  renderItem={source => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={`/images/${source.category}.png`} />}
                        title={<Link to={`/screenarticlesbysource/${source.id}`}>{source.name}</Link>}
                        description={source.description}
                      />
                    </List.Item>
                  )}
                />


          </div>
                 
      </div>
  );
}

function mapStateToProps(state){
  return {selectedLang: state.selectedLang, token: state.token}
}

function mapDispatchToProps(dispatch){
  return {
    changeLang: function(selectedLang){
      dispatch({type: 'changeLang', selectedLang: selectedLang})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSource)
