use sale_db;
-- Create users
create user
'sales'@'localhost' identified by 'sales123$',
'marketing'@'localhost' identified by 'marketing123$',
'dev'@'localhost' identified by 'dev123$';
-- Create roles
create role 'sales_analyst', 'marketing_viewer', 'developer';
-- Permission for roles
grant select on sale_db.employee_info to 'sales_analyst';
grant select on sale_db.sales_data to 'sales_analyst';
grant select on sale_db.contact_info to 'marketing_viewer';
grant select, update on sale_db.user_accounts to 'developer';
-- Grant roles to users
grant 'sales_analyst' to 'sales'@'localhost';
grant 'marketing_viewer' to 'marketing'@'localhost';
grant 'developer' to 'dev'@'localhost';