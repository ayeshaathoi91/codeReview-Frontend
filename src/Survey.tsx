import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate} from 'react-router-dom';
import React, { useEffect} from 'react';
import { addreview,viewData } from './apiCalls';


import {
  Button,
  Typography,
  TextField,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Paper,
  Grid,
  Card,
  Rating,
} from '@mui/material';

import Header from './Header';
import Footer from './Footer';
import { da, tr } from 'date-fns/locale';




interface codeReview {
    microsoft_generated_comment : string;
    our_review_comment : string;
    patch_file : string;
    data_id : number;
}

function Survey() {
    
    const [formData, setFormData] = useState<{
        data_id: number;
        microsoft_generated_comment : string;
        our_review_comment : string;
        patch_file : string;
        name: string;
        organization: string;
        proj: string;
        lang: string;
        comment: string;
        rating_information: number;
        rating_relevance: number;
    }>({
        data_id: -1,
        microsoft_generated_comment : '',
        our_review_comment : '',
        patch_file : '',
        name: '',
        organization: '',
        proj: '',
        lang: '',
        comment: '',
        rating_information: 0,
        rating_relevance: 0
    });

    const fillForm = async () => {
      
        const res = await viewData(formData.lang).then((res) => {
          // console.log(res);
          // console.log({ ...formData, 
          //   data_id: res.data_id,
          //   microsoft_generated_comment: res.original,
          //   our_review_comment: res.output,
          //   patch_file: res.patch,
          // });
          setFormData({ ...formData, 
            data_id: res.data_id,
            microsoft_generated_comment: res.original,
            our_review_comment: res.output,
            patch_file: res.patch,
          });
          
          // console.log(formData);
        });
      
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (!formData.name || !formData.organization) {
          alert("Please fill all the fields");
          return;
        }
        e.preventDefault();
        try {

          const dataToSend = {
            name: formData.name,
            organization: formData.organization,
            data_id: formData.data_id,
            rating_information: formData.rating_information,
            rating_relevance: formData.rating_relevance,
            comment: formData.comment,
          };
          await addreview(dataToSend);
          
        } catch (err) {
          console.log(err);
        }

        formData.data_id = -1;
        formData.microsoft_generated_comment = '';
        formData.our_review_comment = '';
        formData.patch_file = '';
        formData.rating_information = 0;
        formData.rating_relevance = 0;
        formData.comment = '';
        formData.proj = '';
        fillForm();
      };


    return (
        <>
        <div>
            <Header />
        </div>
         <div className="ml-20 mt-24">
          <div>
            <div className="side-nav-item">
                <div className="flex flex-row">
                <div style={{ flex: 1 }}>
                    <TextField 
                        id="outlined-basic" 
                        label="Your name" 
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) =>{
                            setFormData({ ...formData, name: e.target.value })
                        }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <TextField 
                        id="outlined-basic" 
                        label="Your organization" 
                        variant="outlined"
                        value={formData.organization}
                        onChange={(e) =>
                            setFormData({ ...formData, organization: e.target.value })
                        }
                    />
                </div>
                </div>

                <div className="flex flex-row mt-10">

                <select
                  name="lang"
                  id="lang"
                    className="p-2 border-2 rounded-lg bg-white text-blue-500"
                  value={formData.lang}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>{
                      console.log(e.target.value);
                        // setFormData({ 
                        //     ...formData, 
                        //     lang: e.target.value
                        // })
                        formData.lang = e.target.value;
                        fillForm();
                  }}
                >
                  <option value="">Select your preferred language</option>
                  <option value="py">Python</option>
                  <option value="java">Java</option>
                  <option value="js">Javascript</option>
                  <option value="cpp">C++</option>
                  <option value="c">C</option>
                  <option value=".cs">C#</option>
                  <option value="go">Go</option>
                  <option value="php">PHP</option>
                  <option value="rb">Ruby</option>
                </select>
                </div>
                </div>
                </div>
                </div>

                <div className="flex flex-row mt-10 ml-20">
                    <div style={{ flex: 1, width: '50%'}}>
                    <Card className="p-4 mr-10" style={{width: '100%', overflow: 'scroll' }}>
                            <Typography variant="h6" className="mb-4">
                              <pre>
                                {formData.patch_file}
                                </pre>
                            </Typography>
                        </Card>
                    </div>
                    <div style={{ flex: 1 , width: '100%', paddingLeft: '5%'}}>
                    <div style={{ flex: 1, width: '40%' }}>
                        <big>Microsoft Generated Comment</big>
                    </div>
                    <div style={{ flex: 1, width: '80%' }}>
                        <Card className="p-4 mr-10" style={{width: '100%', overflow: 'scroll'}}>
                            <Typography variant="h6" className="mb-4">
                            <pre>
                                {formData.microsoft_generated_comment}
                                </pre>
                            </Typography>
                        </Card>
                       
                        {/* <hr className="mt-4" /> */}

                    </div>

                    <div style={{ flex: 1, width: '40%', paddingTop: '5%' }}>
                        <big>Our Model Generated Comment</big>
                    </div>
                    <div style={{ flex: 1, width: '80%' }}>
                    <Card className="p-4 mr-10" style={{width: '100%', overflow: 'scroll'}}>
                            <Typography variant="h6" className="mb-4">
                            <pre>
                                {formData.our_review_comment}
                                </pre>
                            </Typography>
                        </Card>
                    </div>
                      
                    </div>
                   
                </div>

                

                <div className="flex flex-row mt-10 ">
                <div style={{ flex: 1 }}>
                <div className="flex justify-between mt-4 ml-20 mr-20">
              <Typography >Rate our comment on basis of information : </Typography>
              <Rating
                name="rating_information"
                value={formData.rating_information || 0}
                onChange={(event, newValue) =>
                    setFormData({ ...formData, rating_information: (newValue === null ? 0 : newValue) })
                }
              />
            </div>
            </div>
            <div style={{ flex: 1 }}>
            <div className="flex justify-between mt-4 mr-20">
                <Typography component="legend">Rate our comment on basis of relevance : </Typography>
                <Rating
                    name="rating_relevance"
                    value={formData.rating_relevance || 0}
                    onChange={(event, newValue) =>
                    setFormData({ ...formData, rating_relevance: (newValue === null ? 0 : newValue) })
                    }
                />
                </div>
            </div>
            </div>
            
            <div className="flex justify-between mt-4 ml-20 mr-10">
              <TextField
                label="What will you suggest to be commented on this patch file?"
                name="comment"
                type="text"
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                variant="outlined"
                required
                fullWidth
              />
            </div>

               
                

                <div className="flex flex-col items-center justify-center mt-10">
                <Button
                variant="contained"
                color="primary"
                type="submit"
                className="mt-4"
                onClick={handleSubmit}
                >

                Submit
                </Button>
                </div>
                
                
        
        <div className="mt-16">
            <Footer />
        </div>
        </>

    );
}

export default Survey;
