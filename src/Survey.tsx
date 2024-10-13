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
    ground_truth : string;
    // Array of outputs
    model_output : string[];
    patch_file : string;
    data_id : number;
}

function Survey() {
    
    const [formData, setFormData] = useState<{
        data_id: number;
        ground_truth : string;
        model_output : string[];
        patch_file : string;
        name: string;
        organization: string;
        proj: string;
        lang: string;
        comment: string;
        model_information_score : number[];
        model_relevance_score : number[];
        model_explanation_clarity_score : number[];

    }>({
        data_id: -1,
        ground_truth : '',
        model_output : [],
        patch_file : '',
        name: '',
        organization: '',
        proj: '',
        lang: '',
        comment: '',
        model_information_score : [],
        model_relevance_score : [],
        model_explanation_clarity_score : [],
    });

    const fillForm = async () => {
      
        const res = await viewData(formData.lang).then((res) => {
          // console.log(res);
          // console.log({ ...formData, 
          //   data_id: res.data_id,
          //   ground_truth: res.original,
          //   gpt_three_output_both: res.output,
          //   patch_file: res.patch,
          // });
          setFormData({ ...formData, 
            data_id: res.data_id,
            ground_truth: res.original,
            model_output: res.output,
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
            model_information_score: formData.model_information_score,
            model_relevance_score: formData.model_relevance_score,
            model_explanation_clarity_score: formData.model_explanation_clarity_score,
            comment: formData.comment,
          };
          await addreview(dataToSend);
          
        } catch (err) {
          console.log(err);
        }

        formData.data_id = -1;
        formData.ground_truth = '';
        formData.model_output = [];
        formData.patch_file = '';
        formData.model_information_score = [];
        formData.model_relevance_score = [];
        formData.model_explanation_clarity_score = [];
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

                {/* Code Summary */}

                  {/* Make it Scrollable up down  */}
                <div className="flex flex-row mt-10 ml-20">
                    <div style={{ flex: 1, width: '50%'}}>
                    <Card className="p-4 mr-10">
                      {/* Up down scroll */}
                            <Typography variant="h6" className="mb-4" style={{width: '100%', overflow: 'scroll'}}>
                              <pre>
                                Code Summary : <br />   
                                {formData.ground_truth}
                                </pre>
                            </Typography>
                        </Card>
                    </div>
                </div>
                <div className="flex flex-row mt-10 ml-20">
                    <div style={{ flex: 1, width: '50%'}}>
                    <Card className="p-4 mr-10">
                            <Typography variant="h6" className="mb-4" style={{width: '100%', overflow: 'scroll'}}>
                              <pre>
                                Code Snippet : <br />
                                {formData.patch_file}
                                </pre>
                            </Typography>
                        </Card>
                    </div>
                   
                </div>

                <div className="flex flex-row mt-10 ml-20">
                    <div style={{ flex: 1, width: '50%'}}>
                    <Card className="p-4 mr-10">
                            <Typography variant="h6" className="mb-4" style={{width: '100%', overflow: 'scroll'}}>
                              <pre>
                                Ground Truth : <br />
                                {formData.ground_truth}
                                </pre>
                            </Typography>
                        </Card>
                    </div>
                   
                </div>

                <div className="flex flex-row mt-10 ml-20">
                Rate the model's output using the respective metrics on a scale from 1 to 5,
                where:
                1 : Very bad , 2 : bad, 3 : Neutral , 4 : Good  , 5 : Very Good
                </div>
                <br />
                <br />

                {/* Table with make border at center */}

                <div align="center">  
                  {/* make the table wider */}
                        
                  
                  
                  <table className="border border-green-600">
                    <thead>
                      <tr>
                        
                        <th className="border border-green-600"> Generated Output </th>
                        <th className="border border-green-600"> Relevance Score </th>
                        <th className="border border-green-600"> Information Score </th>
                        <th className="border border-green-600"> Explanation Clarity Score </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        
                      {/* Write a for loop using model's output */}

                      {formData.model_output.map((output, index) => {
                        return (
                          <>
                            <td className="border border-green-600"> {output} </td>
                            <td className="border border-green-600">
                              <Rating
                                name="model_relevance_score"
                                value={formData.model_relevance_score[index]}
                                onChange={(e) => {
                                  formData.model_relevance_score[index] = parseInt(e.target.value);
                                  setFormData({ ...formData });
                                }}
                              />
                            </td>
                            <td className="border border-green-600">
                              <Rating
                                name="model_information_score"
                                value={formData.model_information_score[index]}
                                onChange={(e) => {
                                  formData.model_information_score[index] = parseInt(e.target.value);
                                  setFormData({ ...formData });
                                }}
                              />
                            </td>
                            <td className="border border-green-600">
                              <Rating
                                name="model_explanation_clarity_score"
                                value={formData.model_explanation_clarity_score[index]}
                                onChange={(e) => {
                                  formData.model_explanation_clarity_score[index] = parseInt(e.target.value);
                                  setFormData({ ...formData });
                                }}
                              />
                            </td>
                          </>
                        );
                      })}


                      </tr>
                    </tbody>
                  </table>
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
