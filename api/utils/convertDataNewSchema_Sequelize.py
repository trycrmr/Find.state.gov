import psycopg2
import sys


s="connection string"
con = psycopg2.connect(s) 

def populateDataTable():
	try: 
		
		cur = con.cursor() 
		
		cur.execute("""SELECT table_name FROM information_schema.tables WHERE table_schema='finddata' """)    
			
		rows = cur.fetchall()

		for row in rows:
			
			table_name = row[0]
			table_name_strip = table_name[:table_name.find('__denorm')]
			
			print table_name

			cur.execute("""select id from public."dataset" where name like '%""" + table_name_strip + "%'" ) 

			rows2= cur.fetchall()
			indId=rows2[0][0]
			
			print indId

			cur.execute("select time, amount, country_level0_id from finddata.\"" + table_name + "\"" )

			rows3= cur.fetchall()

			for row3 in rows3:

				time=row3[0]
				amount=row3[1]
				country_level0_id=row3[2]

				cur.execute("""insert into public."Data" ( "Date", "Value","Country_ID","createdAt","updatedAt", "Indicator_ID") VALUES 
					(""" + str(time) + "," + str(amount) + "," + str(country_level0_id) + ", now(),now()," + str(indId) + ")")

		con.commit()
			
			
	except psycopg2.DatabaseError, e:
	    print 'Error %s' % e    
	    sys.exit(1)

def populateCountryAltNameTable():
	try: 
		
		cur = con.cursor() 

		cur.execute("""INSERT INTO public."Country_Altnames" ("Country_ID", "Altname") select country_level0_id,altname from public."geometry__alt_names" """)
	
		con.commit()
			
			
	except psycopg2.DatabaseError, e:
	    print 'Error %s' % e    
	    sys.exit(1)

def populateCountryTable():
	try: 
		
		cur = con.cursor() 

		cur.execute("""update public."geometry__country_level0" set dos_region = '' where dos_region is null""")

		cur.execute("""update public."geometry__country_level0" set usaid_reg = '' where usaid_reg is null""")

		cur.execute("""update public."geometry__country_level0" set dod_cmd = '' where dod_cmd is null""")

		cur.execute("""update public."geometry__country_level0" set wb_inc_lvl = '' where wb_inc_lvl is null""")
		
		cur.execute("""INSERT INTO public."Countries" ("Country_ID", "Continent","DOD_Group","DOS_Group", "USAID_Group", "INCOME_Group", "Country_Name", "Sub_Country_Name", "Country_Geography") select gid,continent, dod_cmd,dos_region,usaid_reg,wb_inc_lvl,sovereignt,geounit,geom from public."geometry__country_level0"
 """)    
			
		con.commit()
			
			
	except psycopg2.DatabaseError, e:
	    print 'Error %s' % e    
	    sys.exit(1)

def populateCollectionsJunctionTable():
	try: 
		
		cur = con.cursor() 
		
		cur.execute("""select dataset_id,tags_id from public."tags_dataset" where tags_id > 31""")    
			
		rows = cur.fetchall()

		for row in rows:
			
			dataId = row[0]
			tagID = row[1]
			print dataId
			
			cur.execute("""insert into public."Collection_Junction" ( "Indicator_ID", "Category_ID","updatedAt") VALUES (""" + str(dataId) + "," + str(tagID) + ",now(),now())")

		con.commit()
			
			
	except psycopg2.DatabaseError, e:
	    print 'Error %s' % e    
	    sys.exit(1)

def populateCategoriesJunctionTable():
	try: 
		
		cur = con.cursor() 
		
		cur.execute("""select dataset_id,tags_id from public."tags_dataset" where tags_id < 32""")    
			
		rows = cur.fetchall()

		for row in rows:
			
			dataId = row[0]
			tagID = row[1]
			
			cur.execute("""insert into public."Category_Junction" ( "Indicator_ID", "Category_ID","updatedAt","createdAt") VALUES (""" + str(dataId) + "," + str(tagID) + ",now(),now())")

		con.commit()
			
			
	except psycopg2.DatabaseError, e:
	    print 'Error %s' % e    
	    sys.exit(1)

def populateIndicatorsTable():
	try: 
		
		cur = con.cursor() 
		
		cur.execute("""select dataset.id, dataset.label, dataset.webservice, dataorg.label as dataorg, metadataorg.label as metadataorg, dataset.definition, 
			dataset.orgurl, dataset.years, dataset.update_cycle, dataset.scope, dataset.units, dataset.lastorgupdate, dataset.whentoupdate from public."dataset" 
			left outer join public."dataorg" on dataset.dataorg_id = dataorg.id
			left outer join public."metadataorg" on dataset.metadataorg_id = dataorg.id order by dataset.id""")    
			
		rows = cur.fetchall()

		for row in rows:
			
			oldId = row[0]
			name = row[1]
			url=row[2]
			if url is None:
				url=""
			direct=row[3]
			if direct is None:
				direct=""
			original=row[4]
			if original is None:
				original=""
			definition=row[5]
			if definition is None:
				definition=""
			elif (definition.find('\'')>-1):
				definition= definition.replace('\'','\'\'')
			orgurl=row[6]
			if orgurl is None:
				orgurl=""
			years=row[7]
			if years is None:
				years=""
			update_cycle=row[8]
			if update_cycle is None:
				update_cycle=""
			scope=row[9]
			if scope is None:
				scope=""
			units=row[10]
			if units is None:
				units=""
			lastorgupdate=row[11]
			if lastorgupdate is None:
				lastorgupdate=""
			whentoupdate=row[12]
			if whentoupdate is None:
				whentoupdate=""
			
			cur.execute("""insert into public."Indicators" ( "Indicator_ID", "updatedAt","createdAt", "Indicator_Name", "Indicator_URL", "Direct_Indicator_Source", "Original_Indicator_Source", 
				"Indicator_Definition", "Indicator_Data_URL", "Years","Update_Cycle","Scope","Units", "Last_Source_Update_TS","When_To_Update_TS") VALUES 
			(""" + str(oldId) + ",now(),now(),'" + name +  "','" +url + "','" + direct + "','" + original + "','" + definition + "','" + orgurl + "','" + years + "','" 
				+ update_cycle + "','" + scope + "','" + units +  "',now(),now())")

		con.commit()
			
			
	except psycopg2.DatabaseError, e:
	    print 'Error %s' % e    
	    sys.exit(1)


def populateCollectionsTable():
	try: 
		
		cur = con.cursor() 
		
		cur.execute("""select * from public."tags" where category like 'colls'""")    
			
		rows = cur.fetchall()

		for row in rows:
			
			oldId = row[0]
			name = row[2]
			
			cur.execute("""insert into public."Collections" ( "Collection_Name", "Collection_ID","updatedAt","createdAt") VALUES ('""" + name + "'," + str(oldId) + ",now(),now())")

		con.commit()
			
			
	except psycopg2.DatabaseError, e:
	    print 'Error %s' % e    
	    sys.exit(1)


def populateCategoriesTable():
	try:
		
		cur = con.cursor() 
		#select every table in public schema that ends in time
		cur.execute("""select * from public."tags" where category like 'spsd'""")    
			
		rows = cur.fetchall()

		for row in rows:
			
			oldId= row[0]
			print oldId
			name = row[2]
			
			cur.execute("""insert into public."Categories" ("Category_Name", "Sub_Category_Name", "Category_ID", "updatedAt","createdAt") VALUES ('""" + name + "',''," + str(oldId) + ",now(),now())")


		cur.execute("""select * from public."tags" where category like 'subspsd'""")    
			
		rows = cur.fetchall()

		for row in rows:
			
			oldId=row[0]
			print oldId
			name = row[2]
			
			cur.execute("""insert into public."Categories" ("Category_Name", "Sub_Category_Name", "Category_ID", "updatedAt","createdAt") VALUES ('','""" + name + "'," + str(oldId) + ",now(),now())")
		
		con.commit()
			
			
	except psycopg2.DatabaseError, e:
	    print 'Error %s' % e    
	    sys.exit(1)
	    

def main():
	
	#populateCollectionsTable()   
	#populateCategoriesTable()
	#populateIndicatorsTable()
	#populateCategoriesJunctionTable()
	populateCollectionsJunctionTable()
	#populateCountryTable()
	#populateCountryAltNameTable()
	#populateDataTable()


if __name__ == "__main__":
    main()

