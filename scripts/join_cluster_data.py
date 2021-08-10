import pandas as pd
import os
from pathlib import Path


data_dir = Path(os.getcwd()).joinpath("scripts/data")
# use 'cluster.name' to show on the map and to make box plots
# manually check hex is 6 characters e.g. #000000

typology_5 = pd.read_csv(data_dir.joinpath("typology-5_cluster-id-hex.csv"))
typology_5["cluster_5"] = typology_5["cluster.name"]
typology_5["hex_5"] = typology_5["hex"]
typology_5 = typology_5[["ID", "cluster_5", "hex_5"]]

typology_18 = pd.read_csv(data_dir.joinpath("typology-18_cluster-id-hex.csv"))
typology_18["cluster_18"] = typology_18["cluster.name"]
typology_18["hex_18"] = typology_18["hex"]
typology_18 = typology_18[["ID", "cluster_18", "hex_18"]]

df = pd.read_csv(data_dir.joinpath("glowdex-hab-presence.csv"))
df = df.merge(typology_5, on="ID", how="left")
df = df.merge(typology_18, on="ID", how="left")

df.to_csv(data_dir.joinpath("all-clusters.csv"), index=False)