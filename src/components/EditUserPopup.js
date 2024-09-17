import React from 'react'
import { Modal} from "react-bootstrap";
import EditUserInfo from './EditUserInfo';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default function EditUserPopup(props) {  
    return (
    <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='toptop'
            >
                <Modal.Header closeButton>
                    <Modal.Title className="color-main" dir='rtl'>
                        تعديل بيانات Server
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body dir="rtl">
                    <Tabs selectedTabClassName="color-main">
                        <TabList>
                            <Tab>تعديل البيانات</Tab>
                        </TabList>

                        <TabPanel>
                            <EditUserInfo props={props} />
                        </TabPanel>

                        {/* <TabPanel>
                            <EditServerScripts props={props} />
                        </TabPanel> */}

                    </Tabs>

                </Modal.Body>

            </Modal>
    </>
)}

