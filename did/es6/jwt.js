import { ethers } from 'ethers';
import { verifyCredential, createVerifiableCredentialJwt} from 'did-jwt-vc'
import dotenv from "dotenv";

dotenv.config({
  path: "../.env"
});
