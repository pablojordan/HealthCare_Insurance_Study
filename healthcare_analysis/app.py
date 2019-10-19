import os

import pandas as pd
import numpy as np
import tablib


import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup 
#################################################

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL', '') or "sqlite:///db/medicareDB.db"
app.config['JSON_SORT_KEYS'] = False
SQLALCHEMY_TRACK_MODIFICATIONS = False
db = SQLAlchemy(app)

dburl = "postgres://fbjfmujpfzcgig:3945cc65b940fbbe57d1f48f606e96cbfd509a2cf4a34049c4570d6d06ed4e28@ec2-107-20-198-176.compute-1.amazonaws.com:5432/da94q63g9n0rr9"



engine = create_engine(dburl)
# engine = create_engine("sqlite:///db/medicareDB.db")
conn = engine.connect()

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Base.classes.keys()

# dataset = tablib.Dataset()
# with open(os.path.join(os.path.dirname(__file__),'../../dataCLEAN_part_d_Data.csv')) as f:
#     dataset.csv = f.read()


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


@app.route("/03a_top10_uninsure_graph.html")

def uninsured():

    return render_template("03a_top10_uninsure_graph.html")

@app.route("/02changes_last_version.html")

def changes():

    return render_template("02changes_last_version.html")

@app.route("/03b.html")

def changes2():
    
    return render_template("03b.html")

@app.route("/03d_correlation.html")

def correlation():

    return render_template("03d_correlation.html")

@app.route("/indexpic.html")

def final():

    return render_template("indexpic.html")

# @app.route("/03c_top20.png")

# def venn():

#     return render_template("03c_top20.png")

@app.route("/states1")
def state():
    """Return a list of states."""

    # Use Pandas to perform the sql query
    states = pd.read_sql(f"Select name from clean_states_tables", engine)
    states_list = states["name"]
    
    # Return a list of the row names of states
    return jsonify(states_list.tolist())

@app.route("/states2")
def state2():
    """Return a list of states."""

    # Use Pandas to perform the sql query
    states2 = pd.read_sql("Select name from CLEAN_states_tables", engine)
    states_list2 = states2["name"]
    
    # Return a list of the row names of states
    return jsonify(states_list2.tolist())


@app.route("/totalPrescribedIn/<state>")

def total_prescribedIn(state):

    # Use Pandas to perform the sql query
   
    prescribed_cost_in = pd.read_sql(f" SELECT DISTINCT * FROM CLEAN_total_avg_cost_inpatients WHERE name = '{state}' ORDER BY cost_per_treatment DESC LIMIT 3", engine)

    # prescribed_cost_inpa_dict = prescribed_cost_inpa.to_dict()
    prescribed_cost_in_dict = {"state_abbr": prescribed_cost_in.provider_state.tolist(),"city":prescribed_cost_in.city.tolist(),"cost_per_treatment":prescribed_cost_in.cost_per_treatment.tolist(),"avg_charges":prescribed_cost_in.avg_charges.tolist(),"msdrg_total_count":prescribed_cost_in.msdrg_total_count.tolist(),"state_name": prescribed_cost_in.name.tolist(), "type":prescribed_cost_in.type.tolist()}


    return jsonify(prescribed_cost_in_dict)

@app.route("/totalPrescribedIn2/<state2>")

def total_prescribedIn2(state2):

     # Use Pandas to perform the sql query
    prescribed_cost_in2 = pd.read_sql(f"SELECT DISTINCT * FROM CLEAN_total_avg_cost_inpatients WHERE name = '{state2}' ORDER BY cost_per_treatment DESC LIMIT 3", engine)
    # prescribed_cost_inpa_dict = prescribed_cost_inpa.to_dict()
    prescribed_cost_in_dict2 = {"state_abbr": prescribed_cost_in2.provider_state.tolist(),"city":prescribed_cost_in2.city.tolist(),"cost_per_treatment":prescribed_cost_in2.cost_per_treatment.tolist(),"avg_charges":prescribed_cost_in2.avg_charges.tolist(),"msdrg_total_count":prescribed_cost_in2.msdrg_total_count.tolist(),"state_name": prescribed_cost_in2.name.tolist(), "type":prescribed_cost_in2.type.tolist()}


    return jsonify(prescribed_cost_in_dict2)

@app.route("/totalPrescribedOut/<state>")

def total_prescribedOut(state):
    # Use Pandas to perform the sql query
    prescribed_cost_out = pd.read_sql(f"SELECT DISTINCT * FROM CLEAN_total_avg_cost_outpatients WHERE name = '{state}' ORDER BY cost_per_treatment DESC", engine)
    # prescribed_cost_inpa_dict = prescribed_cost_inpa.to_dict()
    prescribed_cost_out_dict = {"state_abbr": prescribed_cost_out.provider_state.tolist(),"city":prescribed_cost_out.city.tolist(),"cost_per_treatment":prescribed_cost_out.cost_per_treatment.tolist(),"avg_charges":prescribed_cost_out.avg_charges.tolist(),"apc_total_count":prescribed_cost_out.apc_total_count.tolist(),"state_name": prescribed_cost_out.name.tolist(), "type":prescribed_cost_out.type.tolist()}

    return jsonify(prescribed_cost_out_dict)

@app.route("/totalPrescribedOut2/<state2>")

def total_prescribedOut2(state2):
    # Use Pandas to perform the sql query
    prescribed_cost_out2 = pd.read_sql(f"SELECT DISTINCT * FROM CLEAN_total_avg_cost_outpatients WHERE name = '{state2}' ORDER BY cost_per_treatment DESC", engine)
    # prescribed_cost_inpa_dict = prescribed_cost_inpa.to_dict()
    prescribed_cost_out_dict2 = {"state_abbr": prescribed_cost_out2.provider_state.tolist(),"city":prescribed_cost_out2.city.tolist(),"cost_per_treatment":prescribed_cost_out2.cost_per_treatment.tolist(),"avg_charges":prescribed_cost_out2.avg_charges.tolist(),"apc_total_count":prescribed_cost_out2.apc_total_count.tolist(),"state_name": prescribed_cost_out2.name.tolist(), "type":prescribed_cost_out2.type.tolist()}

    return jsonify(prescribed_cost_out_dict2)

@app.route("/diagnosis")

def mostDiagnosis():

    # Use Pandas to perform the sql query
    most_diagnosis = pd.read_sql(f" SELECT DISTINCT * FROM clean_inpatients_drg_data ORDER BY drg_count DESC LIMIT 50", engine)
    # " SELECT DISTINCT * FROM clean_inpatients_drg_data GROUP by city, drg_definition ORDER BY drg_count DESC LIMIT 100"
    most_diagnosis = most_diagnosis.dropna()

    most_diagnosis_dict = {"state_abbr": most_diagnosis.provider_state.tolist(), "city":most_diagnosis.city.tolist(), "drg_code":most_diagnosis.drg_code.tolist(),"drg_definition":most_diagnosis.drg_definition.tolist(), "drg_count":most_diagnosis.drg_count.tolist(), "drg_total_payments":most_diagnosis.drg_total_payments.tolist(), "avg_pay_drg": most_diagnosis.avg_pay_drg.tolist(), "name": most_diagnosis.name.tolist()}

    return jsonify(most_diagnosis_dict)

@app.route("/partD")

def partDprescriptions():


    # part_d = pd.read_csv("db/CLEAN_part_d_Data.csv",sep=',', error_bad_lines=False, index_col=False, dtype='unicode')

    # SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    # json_url = os.path.join(SITE_ROOT, "db", "partD_data_Geo.geojson")
    # data = geojson.load(open(json_url))
    # return render_template('showjson.jade', data=data)
  
    # Use Pandas to perform the sql query or read json file
    # part_d_json_read = pd.read_json("data/CLEAN_part_d_Data.json")
    part_d = pd.read_sql(f" SELECT * FROM CLEAN_part_d_Data", engine)
    part_d = part_d.dropna()

    part_d_dict = part_d.to_dict(orient = 'record')

    # state = part_d.provider_state.tolist(),
    # name = part_d.name.tolist(),
    # drug_name = part_d.drug_name.tolist(),
    # drug_most_consumed = part_d.drug_count_most_consumed.tolist(),
    # total_drug_count = part_d.total_drug_count.tolist(),
    # specialty_description = part_d.specialty_description.tolist(),
    # drug_claim_count = part_d.drug_claim_count.tolist(),
    # drug_supply_count = part_d.drug_supply_count.tolist(),
    # drug_cost = part_d.drug_cost.tolist(),
    # avg_cost_drug = part_d.avg_cost_drug.tolist(),
    # latitude = part_d.latitude.tolist(),
    # longitude = part_d.longitude.tolist(),

    # part_d_dict = {"state": state,"state_name":name, "drug_name": drug_name,"drug_consumed":drug_most_consumed,"total_drug_count":total_drug_count, "specialty":specialty_description, "drug_claim_count": drug_claim_count, "drug_supply_count": drug_supply_count,"drug_cost":drug_cost,"avg_cost_drug": avg_cost_drug, "latitude": latitude, "longitude": longitude}

    return jsonify(part_d_dict)

@app.route("/partDscatter")


def partDscatterplot():
    # Use Pandas to perform the sql query or read json file
    # part_d_json_read = pd.read_json("data/CLEAN_part_d_Data.json")
    part_d_scatter = pd.read_sql(f" SELECT * FROM CLEAN_part_d_Data", engine)

    part_d_scatter_dict = part_d_scatter.to_dict(orient = 'record')

    return jsonify(part_d_scatter_dict)


@app.route("/diagnosisTable")

def diagnosisTable():

    diagnosisData= pd.read_sql(f" SELECT DISTINCT * FROM clean_inpatients_drg_data ORDER BY drg_count DESC LIMIT 200", engine)

    diagnosisData = diagnosisData.dropna()
    diagnosisData.drop(columns = ["latitude"], inplace = True) 
    diagnosisData.drop(columns = ["longitude"], inplace = True) 

    diagnosisData_dict = diagnosisData.to_dict(orient = 'record')

    # diagnosisData_dict = {"name": diagnoxsisData.name.tolist(),"state_abbr": diagnosisData.provider_state.tolist(), "city":diagnosisData.city.tolist(), "drg_code":diagnosisData.drg_code.tolist(),"drg_definition":diagnosisData.drg_definition.tolist(), "drg_count":diagnosisData.drg_count.tolist(), "drg_total_payments":diagnosisData.drg_total_payments.tolist(), "avg_pay_drg": diagnosisData.avg_pay_drg.tolist()}
   
    return jsonify(diagnosisData_dict)



if __name__ == '__main__':
    app.run(debug = True, port = 5020)  #