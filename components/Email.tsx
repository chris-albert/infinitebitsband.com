import React from 'react'
import {Box, Card, CardContent, Divider, TextField, Typography} from "@mui/material";

const rawSignupHtml = '<div id="mc_embed_shell">\n' +
  '      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">\n' +
  '  <style type="text/css">\n' +
  '        #mc_embed_signup{background:transparent; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 600px;}\n' +
  '        /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.\n' +
  '           We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */\n' +
  '</style>\n' +
  '<div id="mc_embed_signup">\n' +
  '    <form action="https://infinitebitsband.us21.list-manage.com/subscribe/post?u=a1a93328728126d7a0f0b545f&amp;id=a4708a7eb9&amp;f_id=00aee3e6f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">\n' +
  '        <div id="mc_embed_signup_scroll"><h2>Subscribe to hear from us</h2>\n' +
  '            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>\n' +
  '            <div class="mc-field-group"><label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label><input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value=""></div>\n' +
  '        <div id="mce-responses" class="clear foot">\n' +
  '            <div class="response" id="mce-error-response" style="display: none;"></div>\n' +
  '            <div class="response" id="mce-success-response" style="display: none;"></div>\n' +
  '        </div>\n' +
  '    <div aria-hidden="true" style="position: absolute; left: -5000px;">\n' +
  '        /* real people should not fill this in and expect good things - do not remove this or risk form bot signups */\n' +
  '        <input type="text" name="b_a1a93328728126d7a0f0b545f_a4708a7eb9" tabindex="-1" value="">\n' +
  '    </div>\n' +
  '        <div class="optionalParent">\n' +
  '            <div class="clear foot">\n' +
  '                <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe">\n' +
  '                <p style="margin: 0px auto;"><a href="http://eepurl.com/iAeKP6" title="Mailchimp - email marketing made easy and fun"><span style="display: inline-block; background-color: transparent; border-radius: 4px;"><img class="refferal_badge" src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg" alt="Intuit Mailchimp" style="width: 220px; height: 40px; display: flex; padding: 2px 0px; justify-content: center; align-items: center;"></span></a></p>\n' +
  '            </div>\n' +
  '        </div>\n' +
  '    </div>\n' +
  '</form>\n' +
  '</div>\n' +
  '<script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script><script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]=\'EMAIL\';ftypes[0]=\'email\';fnames[1]=\'FNAME\';ftypes[1]=\'text\';fnames[2]=\'LNAME\';ftypes[2]=\'text\';fnames[3]=\'ADDRESS\';ftypes[3]=\'address\';fnames[4]=\'PHONE\';ftypes[4]=\'phone\';fnames[5]=\'BIRTHDAY\';ftypes[5]=\'birthday\';}(jQuery));var $mcj = jQuery.noConflict(true);</script></div>\n'

export type EmailProps = {}

export const Email: React.FC<EmailProps> = ({}) => {

  return (
    <Card>
      <CardContent sx={{
        pb: '16px!important'
      }}>
        <Divider textAlign="left" sx={{mb: 2}}>
          <Typography variant="h6" component="div" >
            emails
          </Typography>
        </Divider>
        <Typography sx={{ml: 3}}>For booking, email us at
        &#105;&#110;&#102;&#105;&#110;&#105;&#116;&#101;&#098;&#105;&#116;&#115;&#098;&#097;&#110;&#100;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;
        </Typography>

        <Box>
          { <div dangerouslySetInnerHTML={{ __html: rawSignupHtml }} /> }
        </Box>
      </CardContent>
    </Card>
  )
}
