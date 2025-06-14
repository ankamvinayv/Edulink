import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { addGovScheme, fetchGovSchemes, updateGovScheme, deleteGovScheme } from '@/firebase'; // adjust path
import { Edit, Trash2 } from 'lucide-react';

interface GovtSchemesProps {
  userType: 'admin' | 'student';
}

interface Scheme {
  id: string;
  name: string;
  department: string;
  eligibility: string;
  benefits: string;
  applicationLink: string;
}

const GovtSchemes: React.FC<GovtSchemesProps> = ({ userType }) => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [newScheme, setNewScheme] = useState<Omit<Scheme, 'id'>>({
    name: '',
    department: '',
    eligibility: '',
    benefits: '',
    applicationLink: '',
  });
  const [editingSchemeId, setEditingSchemeId] = useState<string | null>(null);
  const [editedScheme, setEditedScheme] = useState<Omit<Scheme, 'id'>>(newScheme);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchGovSchemes();
      setSchemes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isNew: boolean = false
  ) => {
    const { name, value } = e.target;
    isNew
      ? setNewScheme((prev) => ({ ...prev, [name]: value }))
      : setEditedScheme((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddScheme = async () => {
    try {
      await addGovScheme(newScheme);
      setNewScheme({ name: '', department: '', eligibility: '', benefits: '', applicationLink: '' });
      fetchData();
    } catch (err) {
      console.error("Add error", err);
    }
  };

  const handleEdit = (scheme: Scheme) => {
    setEditingSchemeId(scheme.id);
    setEditedScheme({
      name: scheme.name,
      department: scheme.department,
      eligibility: scheme.eligibility,
      benefits: scheme.benefits,
      applicationLink: scheme.applicationLink,
    });
  };

  const handleSave = async () => {
    if (!editingSchemeId) return;
    try {
      await updateGovScheme(editingSchemeId, editedScheme);
      setEditingSchemeId(null);
      fetchData();
    } catch (err) {
      console.error("Update error", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGovScheme(id);
      fetchData();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Government Schemes</h1>
        <p className="text-gray-600">
          {userType === 'admin'
            ? "View, add, and manage all government schemes."
            : "Explore various government schemes and their benefits."}
        </p>
      </div>

      {userType === 'admin' && (
        <Card className="floating-card">
          <CardHeader>
            <CardTitle className="gradient-text">Add New Scheme</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" placeholder="Name" value={newScheme.name} onChange={(e) => handleInputChange(e, true)} />
            <Input name="department" placeholder="Department" value={newScheme.department} onChange={(e) => handleInputChange(e, true)} />
            <Textarea name="eligibility" placeholder="Eligibility" value={newScheme.eligibility} onChange={(e) => handleInputChange(e, true)} />
            <Textarea name="benefits" placeholder="Benefits" value={newScheme.benefits} onChange={(e) => handleInputChange(e, true)} />
            <Input name="applicationLink" placeholder="Application Link" value={newScheme.applicationLink} onChange={(e) => handleInputChange(e, true)} />
            <Button onClick={handleAddScheme}>Add Scheme</Button>
          </CardContent>
        </Card>
      )}

      <Card className="floating-card">
        <CardHeader>
          <CardTitle className="gradient-text">Schemes List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Eligibility</TableHead>
                <TableHead>Benefits</TableHead>
                <TableHead>Link</TableHead>
                {userType === 'admin' && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6}>Loading...</TableCell>
                </TableRow>
              ) : (
                schemes.map((scheme) => (
                  <TableRow key={scheme.id}>
                    {editingSchemeId === scheme.id ? (
                      <>
                        <TableCell><Input name="name" value={editedScheme.name} onChange={handleInputChange} /></TableCell>
                        <TableCell><Input name="department" value={editedScheme.department} onChange={handleInputChange} /></TableCell>
                        <TableCell><Textarea name="eligibility" value={editedScheme.eligibility} onChange={handleInputChange} /></TableCell>
                        <TableCell><Textarea name="benefits" value={editedScheme.benefits} onChange={handleInputChange} /></TableCell>
                        <TableCell><Input name="applicationLink" value={editedScheme.applicationLink} onChange={handleInputChange} /></TableCell>
                        <TableCell>
                          <Button size="sm" onClick={handleSave}>Save</Button>
                          <Button size="sm" variant="ghost" onClick={() => setEditingSchemeId(null)}>Cancel</Button>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{scheme.name}</TableCell>
                        <TableCell>{scheme.department}</TableCell>
                        <TableCell>{scheme.eligibility}</TableCell>
                        <TableCell>{scheme.benefits}</TableCell>
                        <TableCell><a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">Apply Here</a></TableCell>
                        {userType === 'admin' && (
                          <TableCell>
                            <Button size="sm" onClick={() => handleEdit(scheme)}><Edit className="w-4 h-4 mr-1" />Edit</Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDelete(scheme.id)}><Trash2 className="w-4 h-4 mr-1" />Delete</Button>
                          </TableCell>
                        )}
                      </>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovtSchemes;
